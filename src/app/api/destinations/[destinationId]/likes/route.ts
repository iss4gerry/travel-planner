import { DestinationService } from '@/lib/api/destination-service';
import catchError, { Context } from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

export const POST = catchError(async (req: NextRequest, context: Context) => {
	const userId = req.headers.get('x-user-id');
	const { destinationId } = await context.params;

	const result = await DestinationService.likeDestination(
		destinationId,
		userId!
	);

	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});

export const GET = catchError(async (req: NextRequest, context: Context) => {
	const userId = req.headers.get('x-user-id');
	const { destinationId } = await context.params;

	const result = await DestinationService.getLikes(destinationId, userId!);

	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});

export const DELETE = catchError(async (req: NextRequest, context: Context) => {
	const userId = req.headers.get('x-user-id');
	const { destinationId } = await context.params;

	const result = await DestinationService.deleteLike(destinationId, userId!);

	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
