import { PlanService } from '@/lib/api/plan-service';
import { createPlanSchema } from '@/lib/validations/plan-schema';
import { parseQueryParams } from '@/lib/validations/query-schema';
import { CreatePlan } from '@/types/plan';
import catchError from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

export const POST = catchError(async (req: NextRequest) => {
	const body: CreatePlan = await req.json();
	createPlanSchema.parse(body);
	const userId = req.headers.get('x-user-id');
	if (!userId) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}
	const result = await PlanService.createPlan(body, userId);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});

export const GET = catchError(async (req: NextRequest) => {
	const userId = req.headers.get('x-user-id');

	const { searchParams } = req.nextUrl;

	if (!userId) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}

	const page = parseInt(searchParams.get('page') || '1', 10);
	const limit = parseInt(searchParams.get('limit') || '8', 10);
	const sort = searchParams.get('sort') || 'createdAt';
	const order =
		(searchParams.get('order') || 'desc').toLowerCase() === 'asc'
			? 'asc'
			: 'desc';
	const query = parseQueryParams({ page, limit, sort, order });
	const result = await PlanService.getAllPlan(userId, query);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
