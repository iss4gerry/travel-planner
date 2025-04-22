import { DestinationService } from '@/lib/api/destination-service';
import {
	CreateDestination,
	createDestinationSchema,
} from '@/lib/validations/destination-schema';
import { parseQueryParams } from '@/lib/validations/query-schema';
import catchError from '@/utils/catchError';
import { NextRequest, NextResponse } from 'next/server';

export const GET = catchError(async (req: NextRequest) => {
	const { searchParams } = req.nextUrl;

	const page = parseInt(searchParams.get('page') || '1', 10);
	const limit = parseInt(searchParams.get('limit') || '8', 10);
	const sort = searchParams.get('sort') || 'createdAt';
	const order =
		(searchParams.get('order') || 'desc').toLowerCase() === 'asc'
			? 'asc'
			: 'desc';
	const query = parseQueryParams({ page, limit, sort, order });

	const { data, total } = await DestinationService.getAllDestination(query);

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

export const POST = catchError(async (req: NextRequest) => {
	const data: CreateDestination = await req.json();
	createDestinationSchema.parse(data);
	const result = await DestinationService.createDestination(data);

	return NextResponse.json({
		status: 200,
		message: 'Success',
		data: result,
	});
});
