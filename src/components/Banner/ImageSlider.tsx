'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchBannerClient } from '@/lib/services/banner-service';

export const ImageSlider = () => {
	const { data: banners } = useSuspenseQuery({
		queryKey: ['banners'],
		queryFn: fetchBannerClient,
		staleTime: 1000 * 60 * 5,
	});
	const [currentIndex, setCurrentIndex] = useState(0);
	const [visibleDots, setVisibleDots] = useState<number[]>([]);
	const maxDots = 4;

	const updateVisibleDots = useCallback(
		(activeIndex: number) => {
			if (!banners || banners.length <= maxDots) {
				setVisibleDots(
					Array.from({ length: banners?.length || 0 }, (_, i) => i)
				);
				return;
			}

			const dots: number[] = [];
			const halfMaxDots = Math.floor(maxDots / 2);

			let start = Math.max(0, activeIndex - halfMaxDots);
			const end = Math.min(banners.length - 1, start + maxDots - 1);

			if (end === banners.length - 1) {
				start = Math.max(0, end - maxDots + 1);
			}

			for (let i = start; i <= end; i++) {
				dots.push(i);
			}

			setVisibleDots(dots);
		},
		[banners, maxDots]
	);

	useEffect(() => {
		updateVisibleDots(currentIndex);
	}, [currentIndex, banners, updateVisibleDots]);

	useEffect(() => {
		const interval = setInterval(() => {
			handleSlideChange((currentIndex + 1) % banners.length);
		}, 4500);

		return () => clearInterval(interval);
	}, [currentIndex, banners.length]);

	const handleSlideChange = (index: number) => {
		setCurrentIndex(index);
	};

	const router = useRouter();

	const handleClick = (id: string) => {
		router.push(`banner/${id}`);
	};

	if (!banners || banners.length === 0) {
		return (
			<div className="w-full h-[450px] max-md:h-[250px] overflow-hidden rounded-lg shadow-lg flex items-center justify-center">
				<p className="text-center">No Banner Found</p>
			</div>
		);
	}

	return (
		<div className="relative w-full mx-auto hover:cursor-pointer">
			<div className="w-full h-[450px] max-md:h-[250px] overflow-hidden rounded-lg shadow-lg relative">
				<Image
					onClick={() => handleClick(banners[currentIndex].id)}
					fill
					src={banners[currentIndex].imageUrl || ''}
					alt={banners[currentIndex].title || 'ex'}
					className="object-cover hover:scale-105 ease-in duration-200 z-0"
					sizes="(max-width: 1200px) 100vw"
				/>

				<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center space-x-2 z-10">
					{visibleDots.map((dotIndex) => (
						<div
							key={dotIndex}
							onClick={() => handleSlideChange(dotIndex)}
							className={`rounded-4xl h-1 cursor-pointer transition-all duration-300 ease-in-out ${
								dotIndex === currentIndex
									? 'bg-gray-500 w-12'
									: 'bg-gray-300 w-8'
							}`}
						/>
					))}
				</div>
			</div>

			<div className="flex justify-between absolute top-1/2 transform -translate-y-1/2 w-full px-4">
				<button
					onClick={() =>
						handleSlideChange(
							(currentIndex - 1 + banners.length) % banners.length
						)
					}
					className="bg-white/50 rounded-full p-2 hover:bg-white/75 transition"
				>
					←
				</button>
				<button
					onClick={() => handleSlideChange((currentIndex + 1) % banners.length)}
					className="bg-white/50 rounded-full p-2 hover:bg-white/75 transition"
				>
					→
				</button>
			</div>
		</div>
	);
};

export default ImageSlider;
