import { PlanService } from '@/lib/services/plan-service';
import { createPlanSchema } from '@/lib/validations/plan-schema';
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
	if (!userId) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}
	const result = await PlanService.getAllPlan(userId);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
