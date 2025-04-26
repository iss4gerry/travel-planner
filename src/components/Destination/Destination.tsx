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
import DestinationClient from './DestinationClient';

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

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<DestinationClient />
		</HydrationBoundary>
	);
}
