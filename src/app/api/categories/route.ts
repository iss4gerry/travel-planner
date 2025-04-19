import { CategoryService } from '@/lib/api/category-service';
import { Category } from '@/types/category';
import { NextRequest, NextResponse } from 'next/server';
import { createCategorySchema } from '@/lib/validations/category-schema';
import catchError from '@/utils/catchError';

export const GET = catchError(async () => {
	const result = await CategoryService.getAllCategory();
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});

export const POST = catchError(async (req: NextRequest) => {
	const data: Category = await req.json();
	createCategorySchema.parse(data);
	const result = await CategoryService.createCategory(data);

	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
