import { DestinationService } from '@/lib/api/destination-service';
import catchError, { Context } from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

export const POST = catchError(async (req: NextRequest, context: Context) => {
	const { destinationId } = await context.params;
	const body: { bannerDuration: number } = await req.json();
	const result = await DestinationService.createBannerForDestination(
		body.bannerDuration,
		destinationId,
		'9369b04d-f752-4adb-978c-3fdcf82d07e7'
	);

	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
