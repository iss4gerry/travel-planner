import { NextRequest, NextResponse } from "next/server";
import catchError, { Context } from "@/utils/catchError";
import { BannerService } from "@/lib/api/banner-service";
import { updateBannerSchema } from "@/lib/validations/banner-schema";

export const GET = catchError(async (req: NextRequest, context: Context) => {
	const { bannerId } = await context.params;
	const result = await BannerService.getBannerById(bannerId);
	return NextResponse.json({
		status: 200,
		message: "Success",
		data: result,
	});
});

export const DELETE = catchError(async (req: NextRequest, context: Context) => {
	const { bannerId } = await context.params;
	const result = await BannerService.deleteBanner(bannerId);
	return NextResponse.json({
		status: 200,
		message: "Success",
		data: result,
	});
});

export const PATCH = catchError(async (req: NextRequest, context: Context) => {
	const { bannerId } = await context.params;
	const body = await req.json();
	updateBannerSchema.parse(body);
	const result = await BannerService.updateBanner(body, bannerId);
	return NextResponse.json({
		status: 200,
		message: "Success",
		data: result,
	});
});
