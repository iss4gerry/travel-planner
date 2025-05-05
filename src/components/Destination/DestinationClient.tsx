'use client';

import { fetchDestination } from '@/lib/services/destination-service';
import { parseQueryParams } from '@/lib/validations/query-schema';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import DestinationCard from './DestinationCard';
import Pagination from '../UI/Pagination';

export default function DestinationClinet() {
	const searchParams = useSearchParams();

	const page = parseInt(searchParams.get('page') || '1', 10);
	const limit = parseInt(searchParams.get('limit') || '8', 10);
	const sort = searchParams.get('sort') || 'createdAt';
	const order =
		(searchParams.get('order') || 'desc').toLowerCase() === 'asc'
			? 'asc'
			: 'desc';

	const params = parseQueryParams({ page, limit, sort, order });

	const { data } = useSuspenseQuery({
		queryKey: ['destinations'],
		queryFn: () => fetchDestination(params),
		staleTime: 1000 * 60 * 5,
	});

	const { destinations, pagination } = data;

	if (!destinations || destinations.length < 1) {
		return (
			<div className="flex items-center justify-center w-full h-70">
				<p>No destination found</p>
			</div>
		);
	}
	return (
		<div className="flex flex-col w-full my-5">
			<div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{destinations.map((destination) => (
					<DestinationCard key={destination.id} destination={destination} />
				))}
			</div>
			<div className="w-full flex items-center">
				<Pagination pagination={pagination} url="/" />
			</div>
		</div>
	);
}
