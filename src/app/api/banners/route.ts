import { NextRequest, NextResponse } from 'next/server';
import catchError from '@/utils/catchError';
import { BannerService } from '@/lib/api/banner-service';
import {
	CreateBanner,
	createBannerSchema,
} from '@/lib/validations/banner-schema';

export const POST = catchError(async (req: NextRequest) => {
	const formData = await req.formData();
	const image = formData.get('image') as File;
	if (!image) {
		return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
	}

	const reqData = {
		title: formData.get('title'),
		description: formData.get('description'),
		startDate: formData.get('startDate'),
		address: formData.get('address'),
		cost: formData.get('cost'),
		categoryId: formData.get('categoryId'),
		targetUrl: formData.get('targetUrl'),
		bannerDuration: formData.get('bannerDuration'),
	};

	createBannerSchema.parse(reqData);

	const result = await BannerService.createBanner(
		reqData as CreateBanner,
		'9369b04d-f752-4adb-978c-3fdcf82d07e7'
	);
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
