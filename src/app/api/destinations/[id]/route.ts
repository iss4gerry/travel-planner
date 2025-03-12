import { DestinationService } from '@/lib/services/destination-service';
import {
	UpdateDestination,
	updateDestinationSchema,
} from '@/lib/validations/destination-schema';
import catchError from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
	params: Promise<{ id: string }>;
};

export const GET = catchError(async (req: NextRequest, context: Context) => {
	const id = (await context.params).id;
	const result = await DestinationService.getDestinationById(id);

	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});

export const DELETE = catchError(async (req: NextRequest, context: Context) => {
	const id = (await context.params).id;
	const result = await DestinationService.deleteDestination(id);

	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});

export const PATCH = catchError(async (req: NextRequest, context: Context) => {
	const id = (await context.params).id;
	const body: UpdateDestination = await req.json();
	updateDestinationSchema.parse(body);
	const result = await DestinationService.updateDestination(body, id);

	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
