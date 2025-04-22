import { PlanService } from '@/lib/api/plan-service';
import { Itinerary } from '@/types/plan';
import catchError, { Context } from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';
import { json } from 'stream/consumers';

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
	const body: Itinerary = await req.json();
	const result = await PlanService.saveItinerary({ result: body }, planId);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
