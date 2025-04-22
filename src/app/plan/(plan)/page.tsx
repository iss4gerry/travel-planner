import { fetchPlanServer } from '@/lib/services/plan-service';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';

import PlansClient from './PlansClient';
import { cookies } from 'next/headers';
import { parseQueryParams } from '@/lib/validations/query-schema';

type Props = {
	searchParams: Promise<{
		page?: string;
		limit?: string;
		sort?: string;
		order?: string;
	}>;
};

export default async function Page({ searchParams }: Props) {
	const params = await searchParams;

	const parse = parseQueryParams(params);

	const cookieStore = (await cookies()).toString();
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ['plans', parse.page, parse.limit, parse.sort, parse.order],
		queryFn: () => fetchPlanServer(cookieStore, parse),
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<PlansClient />
		</HydrationBoundary>
	);
}
