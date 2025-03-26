'use client';

import React, { useState } from 'react';
import { BannerResponse } from '@/types/banner';
import Image from 'next/image';
export const ImageSlider = ({ banners }: { banners: BannerResponse[] }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleSlideChange = (index: number) => {
		setCurrentIndex(index);
	};

	if (!banners || banners.length === 0) {
		return <p className="text-center">No Banner Found</p>;
	}

	return (
		<div className="relative w-full mx-auto">
			<div className="w-full h-[450px] overflow-hidden rounded-lg shadow-lg relative">
				<Image
					fill
					src={banners[currentIndex].imageUrl}
					alt={banners[currentIndex].title}
					className="object-cover"
					sizes="(max-width: 1200px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</div>

			<div className="flex justify-center mt-4 space-x-2">
				{banners.map((_, index) => (
					<div
						key={index}
						onClick={() => handleSlideChange(index)}
						className={`h-1 cursor-pointer transition-all duration-300 ease-in-out ${
							index === currentIndex ? 'bg-blue-500 w-12' : 'bg-gray-300 w-8'
						}`}
					/>
				))}
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
