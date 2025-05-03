import { BannerService } from '@/lib/api/banner-service';
import { DestinationService } from '@/lib/api/destination-service';
import catchError from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

export const GET = catchError(async (req: NextRequest) => {
	const userId = req.headers.get('x-user-id');

	if (!userId) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}
	const result = await DestinationService.getDestinationByUserId(userId);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
