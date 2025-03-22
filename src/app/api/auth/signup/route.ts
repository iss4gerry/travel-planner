import { prisma } from '@/lib/db';
import { AuthService } from '@/lib/services/auth-service';
import { RegisterInput, registerSchema } from '@/lib/validations/auth-schema';
import { ApiError } from '@/utils/apiError';
import catchError from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

export const POST = catchError(async (req: NextRequest) => {
	const body: RegisterInput = await req.json();
	registerSchema.parse(body);
	const result = await AuthService.register(body);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
