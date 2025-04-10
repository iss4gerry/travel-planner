import { NewsService } from '@/lib/services/news-service';
import catchError from '@/utils/catchError';
import { NextResponse } from 'next/server';

export const GET = catchError(async () => {
	const result = await NewsService.getRandomNews();

	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	}); 
});
