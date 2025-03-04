import { NextRequest, NextResponse } from 'next/server';
import { CategoryService } from '@/lib/services/category-service';

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const result = await CategoryService.getCategory(params.id);
		return NextResponse.json({
			status: 200,
			message: 'Success',
			data: result,
		});
	} catch (error) {
		return NextResponse.json(
			{ message: 'GET category failed' },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const result = await CategoryService.deleteCategory(params.id);
		return NextResponse.json({
			status: 200,
			message: 'Success',
			data: result,
		});
	} catch (error) {
		return NextResponse.json(
			{ message: 'Delete category failed' },
			{ status: 500 }
		);
	}
}
