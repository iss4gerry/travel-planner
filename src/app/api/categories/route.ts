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
		return NextResponse.json(
			{ message: 'Get all category failed' },
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
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		}
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
