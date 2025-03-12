import { NextRequest, NextResponse } from 'next/server';
import { CategoryService } from '@/lib/services/category-service';
import { Category } from '@prisma/client';
import { updateCategorySchema } from '@/lib/validations/category-schema';
import catchError, { Context } from '@/utils/catchError';

export const GET = catchError(async (req: NextRequest, context: Context) => {
	const { categoryId } = await context.params;
	const result = await CategoryService.getCategory(categoryId);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});

export const DELETE = catchError(async (req: NextRequest, context: Context) => {
	const { categoryId } = await context.params;
	const result = await CategoryService.deleteCategory(categoryId);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});

export const PATCH = catchError(async (req: NextRequest, context: Context) => {
	const { categoryId } = await context.params;
	const data: Category = await req.json();
	updateCategorySchema.parse(data);
	const result = await CategoryService.updateCategory(categoryId, data);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
