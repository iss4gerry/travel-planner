import { fetchPlanServer } from '@/lib/services/plan-service';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';

import PlansClient from './PlansClient';
import { cookies } from 'next/headers';

export default async function Page() {
	const cookieStore = (await cookies()).toString();
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ['plans'],
		queryFn: () => fetchPlanServer(cookieStore),
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<PlansClient />
		</HydrationBoundary>
	);
}
