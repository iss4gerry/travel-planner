'use client';

import { BannerResponse } from '@/types/banner';
import { useEffect, useState } from 'react';
import ImageSlider from './ImageSlider';

export default function Banner() {
	const [banners, setBanners] = useState<BannerResponse[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetch('/api/banners');
				if (!result.ok) {
					throw new Error('Something went wrong');
				}

				const response: { data: BannerResponse[] } = await result.json();
				setBanners(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="w-full mt-5">
			<ImageSlider banners={banners} />
		</div>
	);
}
