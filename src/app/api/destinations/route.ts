import { DestinationService } from '@/lib/services/destination-service';
import {
	CreateDestination,
	createDestinationSchema,
} from '@/lib/validations/destination-schema';
import catchError from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

export const POST = catchError(async (req: NextRequest) => {
	const data: CreateDestination = await req.json();
	createDestinationSchema.parse(data);
	const result = await DestinationService.createDestination(data);

	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
