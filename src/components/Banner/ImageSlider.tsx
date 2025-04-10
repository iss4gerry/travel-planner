'use client';

import React, { useState } from 'react';
import { BannerResponse } from '@/types/banner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export const ImageSlider = ({ banners }: { banners: BannerResponse[] }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleSlideChange = (index: number) => {
		setCurrentIndex(index);
	};
	const router = useRouter();

	const handleClick = (id: string) => {
		router.push(`banner/${id}`);
	};

	if (!banners || banners.length === 0) {
		return <p className="text-center">No Banner Found</p>;
	}

	return (
		<div className="relative w-full mx-auto hover:cursor-pointer">
			<div className="w-full h-[450px] max-md:h-[250px] overflow-hidden rounded-lg shadow-lg relative">
				<Image
					onClick={() => handleClick(banners[currentIndex].id)}
					fill
					src={banners[currentIndex].imageUrl}
					alt={banners[currentIndex].title}
					className="object-cover hover:scale-105 ease-in duration-200 z-0"
					sizes="(max-width: 1200px) 100vw"
				/>

				<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center space-x-2 z-10">
					{banners.map((_, index) => (
						<div
							key={index}
							onClick={() => handleSlideChange(index)}
							className={`rounded-4xl h-1 cursor-pointer transition-all duration-300 ease-in-out ${
								index === currentIndex ? 'bg-gray-500 w-12' : 'bg-gray-300 w-8'
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
