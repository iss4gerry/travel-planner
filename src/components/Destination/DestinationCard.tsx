'use client';

import { DestinationResponse } from '@/types/destination';
import { Layers, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DestinationCard({
	destination,
}: {
	destination: DestinationResponse;
}) {
	const router = useRouter();
	const handleClick = (id: string) => {
		router.push(`destination/${id}`);
	};
	return (
		<div
			className="card hover:cursor-pointer"
			onClick={() => handleClick(destination.id)}
		>
			<picture className="rounded-lg block overflow-hidden w-full min-h-48 max-h-48">
				<img
					src={
						destination.imageUrl ||
						destination.category?.imageUrl ||
						'https://c1.wallpaperflare.com/preview/308/770/431/sky-cloud-air-blue-sky-background.jpg'
					}
					alt={destination.name}
					className="object-cover w-full h-full hover:scale-110 ease-in duration-150"
				/>
			</picture>
			<div className="p-1">
				<h2 className="font-semibold">{destination.name}</h2>
				<p className="flex-grow line-clamp-2 text-gray-500 text-sm mt-2">
					{destination.description}
				</p>
				<div className="flex flex-row justify-between mt-3">
					<div className="flex flex-row justify-center items-center gap-2.5">
						<Layers className="w-4 h-4" />
						<span className="text-xs">{destination.category?.name}</span>
					</div>
					<div className="flex flex-row items-center justify-center">
						<Heart className="h4 w-4" />
						<span className="text-sm ml-1">{destination._count?.likes}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
