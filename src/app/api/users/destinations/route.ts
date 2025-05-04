import { DestinationService } from '@/lib/api/destination-service';
import { parseQueryParams } from '@/lib/validations/query-schema';
import catchError from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

export const GET = catchError(async (req: NextRequest) => {
	const userId = req.headers.get('x-user-id');
	const { searchParams } = req.nextUrl;
	console.log(userId);
	if (!userId) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}
	const page = parseInt(searchParams.get('page') || '1', 10);
	const limit = parseInt(searchParams.get('limit') || '8', 10);
	const sort = searchParams.get('sort') || 'createdAt';
	const order =
		(searchParams.get('order') || 'desc').toLowerCase() === 'asc'
			? 'asc'
			: 'desc';
	const query = parseQueryParams({ page, limit, sort, order });
	const { data, total } = await DestinationService.getDestinationByUserId(
		userId,
		query
	);
	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: data,
		pagination: {
			page,
			limit,
			total,
			totalPages: Math.ceil(total / limit),
		},
	});
});
