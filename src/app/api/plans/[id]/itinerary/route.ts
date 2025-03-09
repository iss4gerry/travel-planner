import { PlanService } from '@/lib/services/plan-service';
import catchError from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
	params: Promise<{ id: string }>;
};

export const GET = catchError(async (req: NextRequest, context: Context) => {
	const id = (await context.params).id;
	const result = await PlanService.getItinerary(id);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
