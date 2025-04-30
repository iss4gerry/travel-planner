import { PlanService } from '@/lib/api/plan-service';
import catchError, { Context } from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = catchError(async (req: NextRequest, context: Context) => {
	const { activityFromBannerId } = await context.params;
	const result = await PlanService.deleteBannerFromPlan(activityFromBannerId);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
