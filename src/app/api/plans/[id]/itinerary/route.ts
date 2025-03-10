import { itineraryCache } from '@/lib/itinerary-cache';
import { PlanService } from '@/lib/services/plan-service';
import { Itinerary } from '@/types/plan';
import { ApiError } from '@/utils/apiError';
import catchError from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
	params: Promise<{ id: string }>;
};

export const GET = catchError(async (req: NextRequest, context: Context) => {
	const id = (await context.params).id;
	if (itineraryCache.has(id)) {
		itineraryCache.delete(id);
	}
	const itineraryData = await PlanService.getItinerary(id);
	itineraryCache.set(id, { result: itineraryData });
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: itineraryData,
	});
});

export const POST = catchError(async (req: NextRequest, context: Context) => {
	const id = (await context.params).id;
	const cachedBody = itineraryCache.get(id);
	const body = cachedBody;
	const result = await PlanService.saveItinerary(body, id);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
