import { z } from 'zod';

export const registerSchema = z
	.object({
		name: z.string().min(1, 'Name has to be filled'),
		email: z.string().email().min(1, 'Email has to be filled'),
		password: z
			.string()
			.min(8, 'Your password must be at least 8 characters long'),
	})
	.strict();

export type RegisterInput = z.infer<typeof registerSchema>;
