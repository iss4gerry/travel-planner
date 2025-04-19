import { itineraryCache } from '@/lib/itinerary-cache';
import { PlanService } from '@/lib/api/plan-service';
import catchError, { Context } from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

export const GET = catchError(async (req: NextRequest, context: Context) => {
	const { planId } = await context.params;
	if (itineraryCache.has(planId)) {
		itineraryCache.delete(planId);
	}
	const itineraryData = await PlanService.getItinerary(planId);
	itineraryCache.set(planId, { result: itineraryData });
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: itineraryData,
	});
});

export const POST = catchError(async (req: NextRequest, context: Context) => {
	const { planId } = await context.params;
	const cachedBody = itineraryCache.get(planId);
	const body = cachedBody;
	const result = await PlanService.saveItinerary(body, planId);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
