import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { fetchDestinationServer } from '@/lib/services/destination-service';
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
		staleTime: 1000 * 60 * 5,
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<DestinationClient />
		</HydrationBoundary>
	);
}
