import { PlanService } from '@/lib/api/plan-service';
import catchError, { Context } from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

export const GET = catchError(async (req: NextRequest, context: Context) => {
	const { planId } = await context.params;
	const itineraryData = await PlanService.getItinerary(planId);

	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: itineraryData,
	});
});

export const POST = catchError(async (req: NextRequest, context: Context) => {
	const { planId } = await context.params;
	const { body } = await req.json();

	const result = await PlanService.saveItinerary(body, planId);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
