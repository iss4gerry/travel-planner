import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { ApiError } from '@/utils/apiError';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new ApiError(400, 'Email and password are required.');
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user) {
					throw new ApiError(400, 'Invalid email or password.');
				}

				const isPasswordValid = await bcrypt.compare(
					credentials.password,
					user.password
				);
				if (!isPasswordValid) {
					throw new ApiError(404, 'Invalid email or password.');
				}

				return {
					id: user.id,
					email: user.email,
					name: user.name,
				};
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: 'auth/login',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.name = user.name;
			}

			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id as string;
				session.user.email = token.email;
				session.user.name = token.name;
			}

			return session;
		},
	},
	secret: process.env.JWT_SECRET,
});

export { handler as GET, handler as POST };
