'use client';

import { BannerResponse } from '@/types/banner';
import ImageSlider from './ImageSlider';
import { useQuery } from '@tanstack/react-query';

export default function Banner() {
	const getDestination = async () => {
		const result = await fetch('/api/banners');
		if (!result.ok) {
			throw new Error('Something went wrong');
		}

		const response: { data: BannerResponse[] } = await result.json();
		return response.data;
	};

	const { data, isLoading, error } = useQuery({
		queryKey: ['destinations'],
		queryFn: getDestination,
	});

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error Fetching Destination</p>;

	return (
		<div className="w-full mt-5">
			<ImageSlider banners={data ?? []} />
		</div>
	);
}
