import { ApiError } from '@/utils/apiError';
import { prisma } from '../db';
import { RegisterInput } from '../validations/auth-schema';
import bcrypt from 'bcryptjs';

export class AuthService {
	static async register(body: RegisterInput) {
		const isEmailAlreadyExist = await prisma.user.findUnique({
			where: {
				email: body.email,
			},
		});

		if (isEmailAlreadyExist) {
			throw new ApiError(400, 'Email already exist');
		}

		const hashPassword = bcrypt.hashSync(body.password, 10);

		return await prisma.user.create({
			data: {
				...body,
				password: hashPassword,
			},
		});
	}
}
