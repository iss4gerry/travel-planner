import {
	dehydrate,
	hydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import DestinationCard from './DestinationCard';
import { cookies } from 'next/headers';
import { fetchDestinationServer } from '@/lib/services/destination-service';
import { DestinationResponse } from '@/types/destination';
import Pagination from '../UI/Pagination';
import DestinationClinet from './DestinationClient';

type Props = {
	page: number;
	limit: number;
	sort: 'createdAt' | 'title' | 'updatedAt';
	order: 'desc' | 'asc';
};

export default async function Page({ query }: { query: Props }) {
	const queryClient = new QueryClient();

	const cookieStore = (await cookies()).toString();

	await queryClient.prefetchQuery({
		queryKey: ['destinations'],
		queryFn: () => fetchDestinationServer(cookieStore, query),
	});

	const data = queryClient.getQueryData<{
		destination: DestinationResponse[];
		pagination: {
			page: number;
			limit: number;
			total: number;
			totalPages: number;
		};
	}>(['destinations']) || {
		destination: [],
		pagination: { page: 1, limit: 12, total: 0, totalPages: 1 },
	};

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<DestinationClinet />
		</HydrationBoundary>
	);
}
