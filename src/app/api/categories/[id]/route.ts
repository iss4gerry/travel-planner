import { NextRequest, NextResponse } from 'next/server';
import { CategoryService } from '@/lib/services/category-service';
import { Category } from '@prisma/client';
import { ApiError } from '@/utils/apiError';
import { ZodError } from 'zod';
import { formatZodError } from '@/utils/formatZodError';
import { updateCategorySchema } from '@/lib/validations/category-schema';
import catchError from '@/utils/catchError';

type Context = {
	params: Promise<{ id: string }>;
};

export const GET = catchError(async (req: NextRequest, context: Context) => {
	const { id } = await context.params;
	const result = await CategoryService.getCategory(id);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});

export const DELETE = catchError(async (req: NextRequest, context: Context) => {
	const { id } = await context.params;
	const result = await CategoryService.deleteCategory(id);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});

export const PATCH = catchError(async (req: NextRequest, context: Context) => {
	const { id } = await context.params;
	const data: Category = await req.json();
	updateCategorySchema.parse(data);
	const result = await CategoryService.updateCategory(id, data);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
