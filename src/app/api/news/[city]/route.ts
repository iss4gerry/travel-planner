import { NewsService } from '@/lib/api/news-service';
import catchError, { Context } from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

export const GET = catchError(async (req: NextRequest, context: Context) => {
	const { city } = await context.params;
	const result = await NewsService.getNewsByCity(city);

	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
