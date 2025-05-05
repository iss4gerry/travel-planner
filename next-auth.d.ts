import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			pfp: string | null;
		} & DefaultSession['user'];
	}

	interface User {
		id: string;
		pfp: string | null;
	}

	interface JWT {
		pfp: string | null;
	}
}
