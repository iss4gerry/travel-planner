'use client';

import { BannerResponse } from '@/types/banner';
import ImageSlider from './ImageSlider';
import { useQuery } from '@tanstack/react-query';

export default function Banner() {
	const fetchBanners = async () => {
		const result = await fetch('/api/banners');
		if (!result.ok) {
			throw new Error('Something went wrong');
		}

		const response: { data: BannerResponse[] } = await result.json();
		return response.data;
	};

	const { data, isLoading, error } = useQuery({
		queryKey: ['banners'],
		queryFn: fetchBanners,
	});

	return (
		<div className="w-full mt-5">
			<p className="text-2xl min-sm:text-3xl font-bold mb-2">
				Top Destinations for You!
			</p>
			{isLoading || error ? (
				<div className="skeleton w-full h-[450px] max-md:h-[250px]"></div>
			) : (
				<ImageSlider banners={data ?? []} />
			)}
		</div>
	);
}
