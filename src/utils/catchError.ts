import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from './apiError';
import { ZodError } from 'zod';
import { formatZodError } from './formatZodError';

export type Context = {
	params: Promise<{
		categoryId: string;
		planId: string;
		destinationId: string;
		bannerId: string;
		city: string;
		activityId: string;
	}>;
};

export default function catchError(
	handler: (req: NextRequest, context: Context) => Promise<NextResponse>
) {
	return async (req: NextRequest, context: Context) => {
		try {
			return await handler(req, context);
		} catch (error) {
			if (error instanceof ApiError) {
				return NextResponse.json(
					{ message: error.message },
					{ status: error.statusCode }
				);
			}

			if (error instanceof ZodError) {
				return NextResponse.json(
					{ message: formatZodError(error) },
					{ status: 400 }
				);
			}

			return NextResponse.json(
				{ message: 'Internal server error' },
				{ status: 500 }
			);
		}
	};
}
