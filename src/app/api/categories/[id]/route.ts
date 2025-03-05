import { NextRequest, NextResponse } from 'next/server';
import { CategoryService } from '@/lib/services/category-service';
import { Category } from '@prisma/client';
import { ApiError } from '@/app/utils/apiError';

type Context = {
	params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, context: Context) {
	try {
		const { id } = await context.params;

		const result = await CategoryService.getCategory(id);
		return NextResponse.json({
			status: 200,
			message: 'Success',
			data: result,
		});
	} catch (error) {
		if (error instanceof ApiError) {
			return NextResponse.json(
				{ message: error.message },
				{ status: error.statusCode }
			);
		}

		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 }
		);
	}
}

export async function DELETE(req: NextRequest, context: Context) {
	try {
		const { id } = await context.params;
		const result = await CategoryService.deleteCategory(id);
		return NextResponse.json({
			status: 200,
			message: 'Success',
			data: result,
		});
	} catch (error) {
		if (error instanceof ApiError) {
			return NextResponse.json(
				{ message: error.message },
				{ status: error.statusCode }
			);
		}

		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 }
		);
	}
}

export async function PATCH(req: NextRequest, context: Context) {
	try {
		const { id } = await context.params;
		const data: Category = await req.json();
		const result = await CategoryService.updateCategory(id, data);
		return NextResponse.json({
			status: 200,
			message: 'Success',
			data: result,
		});
	} catch (error) {
		if (error instanceof ApiError) {
			return NextResponse.json(
				{ message: error.message },
				{ status: error.statusCode }
			);
		}

		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 }
		);
	}
}
