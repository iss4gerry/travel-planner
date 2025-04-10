import { PlanService } from '@/lib/services/plan-service';
import {
	addDestinationToPlan,
	AddDestinationToPlan,
} from '@/lib/validations/plan-schema';
import catchError from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

export const POST = catchError(async (req: NextRequest) => {
	const body: AddDestinationToPlan = await req.json();
	addDestinationToPlan.parse(body);
	const result = await PlanService.addDestinationToPlan(body);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
	