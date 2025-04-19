import { DestinationService } from '@/lib/api/destination-service';
import {
	UpdateDestination,
	updateDestinationSchema,
} from '@/lib/validations/destination-schema';
import catchError, { Context } from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

export const GET = catchError(async (req: NextRequest, context: Context) => {
	const { destinationId } = await context.params;
	const result = await DestinationService.getDestinationById(destinationId);

	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});

export const DELETE = catchError(async (req: NextRequest, context: Context) => {
	const { destinationId } = await context.params;
	const result = await DestinationService.deleteDestination(destinationId);

	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});

export const PATCH = catchError(async (req: NextRequest, context: Context) => {
	const { destinationId } = await context.params;
	const body: UpdateDestination = await req.json();
	updateDestinationSchema.parse(body);
	const result = await DestinationService.updateDestination(
		body,
		destinationId
	);

	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
