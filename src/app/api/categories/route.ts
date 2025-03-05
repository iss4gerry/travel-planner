import { ApiError } from '@/app/utils/apiError';
import { CategoryService } from '@/lib/services/category-service';
import { Category } from '@/types/category';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
	try {
		const result = await CategoryService.getAllCategory();
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

export async function POST(req: NextRequest) {
	try {
		const data: Category = await req.json();

		const result = await CategoryService.createCategory(data);

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
