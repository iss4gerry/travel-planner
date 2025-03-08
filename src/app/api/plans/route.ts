import { PlanService } from '@/lib/services/plan-service';
import { createPlanSchema } from '@/lib/validations/plan-schema';
import { CreatePlan } from '@/types/plan';
import catchError from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

export const POST = catchError(async (req: NextRequest) => {
	const body: CreatePlan = await req.json();
	createPlanSchema.parse(body);
	const result = await PlanService.createPlan(
		body,
		'9369b04d-f752-4adb-978c-3fdcf82d07e7'
	);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});

export const GET = catchError(async (req: NextRequest) => {
	const result = await PlanService.getAllPlan(
		'9369b04d-f752-4adb-978c-3fdcf82d07e7'
	);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
