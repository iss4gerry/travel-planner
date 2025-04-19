import { BannerService } from '@/lib/api/banner-service';
import catchError, { Context } from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = catchError(async (req: NextRequest, context: Context) => {
	const { bannerId } = await context.params;
	const result = await BannerService.acceptBanner(bannerId);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
