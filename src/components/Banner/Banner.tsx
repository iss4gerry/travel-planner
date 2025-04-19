'use client';

import ImageSlider from './ImageSlider';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchBannerClient } from '@/lib/services/banner-service';

export default function Banner() {
	const { data } = useSuspenseQuery({
		queryKey: ['banners'],
		queryFn: fetchBannerClient,
	});

	return (
		<div className="w-full mt-5">
			<p className="text-2xl min-sm:text-3xl font-bold mb-2">
				Top Destinations for You!
			</p>

			<ImageSlider banners={data ?? []} />
		</div>
	);
}
