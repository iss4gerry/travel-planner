import { PlanService } from '@/lib/api/plan-service';
import {
	addBannerToPlan,
	AddBannerToPlan,
} from '@/lib/validations/plan-schema';
import catchError from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

export const POST = catchError(async (req: NextRequest) => {
	const body: AddBannerToPlan = await req.json();
	addBannerToPlan.parse(body);
	const result = await PlanService.addBannerToPlan(body);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
