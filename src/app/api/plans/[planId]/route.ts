import { PlanService } from '@/lib/services/plan-service';
import { updatePlanSchema } from '@/lib/validations/plan-schema';
import { CreatePlan } from '@/types/plan';
import catchError, { Context } from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

export const GET = catchError(async (req: NextRequest, context: Context) => {
	const { planId } = await context.params;
	const result = await PlanService.getPlanDetail(planId);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});

export const DELETE = catchError(async (req: NextRequest, context: Context) => {
	const { planId } = await context.params;
	const result = await PlanService.deletePlan(planId);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});

export const PATCH = catchError(async (req: NextRequest, context: Context) => {
	const body: CreatePlan = await req.json();
	updatePlanSchema.parse(body);
	const { planId } = await context.params;
	const result = await PlanService.updatePlan(body, planId);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
