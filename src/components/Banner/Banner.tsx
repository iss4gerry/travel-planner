import ImageSlider from './ImageSlider';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { fetchBannerServer } from '@/lib/services/banner-service';
import { cookies } from 'next/headers';

export default async function Banner() {
	const queryClient = new QueryClient();

	const cookieStore = (await cookies()).toString();
	await queryClient.prefetchQuery({
		queryKey: ['banners'],
		queryFn: () => fetchBannerServer(cookieStore),
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<div className="w-full mt-1">
				<ImageSlider />
			</div>
		</HydrationBoundary>
	);
}
