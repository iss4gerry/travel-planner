import Banner from '@/components/Banner/Banner';
import DestinationList from '@/components/Destination/DestinationList';
import { fetchBannerServer } from '@/lib/services/banner-service';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

export default async function Home() {
	const queryClient = new QueryClient();

	const cookieStore = (await cookies()).toString();
	await queryClient.prefetchQuery({
		queryKey: ['banners'],
		queryFn: () => fetchBannerServer(cookieStore),
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<div className="w-full flex items-center flex-col">
				<Suspense
					fallback={
						<div className="skeleton w-full h-[450px] max-md:h-[250px]"></div>
					}
				>
					<Banner />
				</Suspense>
				<DestinationList />
			</div>
		</HydrationBoundary>
	);
}
