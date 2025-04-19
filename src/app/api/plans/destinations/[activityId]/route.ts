import { PlanService } from '@/lib/api/plan-service';
import catchError, { Context } from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = catchError(async (req: NextRequest, context: Context) => {
	const { activityId } = await context.params;
	const result = await PlanService.deleteDestinationFromPlan(activityId);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
