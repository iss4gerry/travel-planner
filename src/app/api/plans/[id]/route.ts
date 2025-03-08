import { PlanService } from '@/lib/services/plan-service';
import { updatePlanSchema } from '@/lib/validations/plan-schema';
import { CreatePlan } from '@/types/plan';
import catchError from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
	params: Promise<{ id: string }>;
};

export const GET = catchError(async (req: NextRequest, context: Context) => {
	const id = (await context.params).id;
	const result = await PlanService.getPlanById(id);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});

export const DELETE = catchError(async (req: NextRequest, context: Context) => {
	const id = (await context.params).id;
	const result = await PlanService.deletePlan(id);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});

export const PATCH = catchError(async (req: NextRequest, context: Context) => {
	const body: CreatePlan = await req.json();
	updatePlanSchema.parse(body);
	const id = (await context.params).id;
	const result = await PlanService.updatePlan(body, id);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
