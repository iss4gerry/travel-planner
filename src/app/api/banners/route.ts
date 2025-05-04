import { NextRequest, NextResponse } from 'next/server';
import catchError from '@/utils/catchError';
import { BannerService } from '@/lib/api/banner-service';
import {
	CreateBanner,
	createBannerSchema,
} from '@/lib/validations/banner-schema';

export const POST = catchError(async (req: NextRequest) => {
	const userId = req.headers.get('x-user-id');

	const body: CreateBanner = await req.json();
	createBannerSchema.parse(body);

	const result = await BannerService.createBanner(body, userId!);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});

export const GET = catchError(async () => {
	const result = await BannerService.getAllBanner();
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
