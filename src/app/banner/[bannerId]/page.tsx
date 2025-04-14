'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Heart, Share2, ChevronLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import DestinationDetailSkeleton from '@/components/Destination/DestinationDetailSkeleton';
import { BannerResponse } from '@/types/banner';

export default function BannerDetails() {
	const params = useParams<{ bannerId: string }>();
	const [isFavorite, setIsFavorite] = useState(false);
	const fetchDestination = async () => {
		const result = await fetch(`/api/banners/${params.bannerId}`);
		if (!result.ok) {
			throw new Error('Something went wrong');
		}

		const response: { data: BannerResponse } = await result.json();
		return response.data;
	};

	const { data, isLoading, error } = useQuery({
		queryKey: ['destinationDetail', params.bannerId],
		queryFn: fetchDestination,
	});

	if (isLoading) return <DestinationDetailSkeleton />;
	if (error)
		return (
			<div className="text-red-500 text-center py-8">
				Error loading destination details
			</div>
		);
	if (!data)
		return <div className="text-center py-8">Destination not found</div>;

	return (
		<div className="w-full mx-auto px-4 py-6">
			<div className="flex items-center mb-6">
				<button
					onClick={() => window.history.back()}
					className="flex items-center text-blue-600 hover:text-blue-800"
				>
					<ChevronLeft size={20} />
					<span>Back to destinations</span>
				</button>
			</div>

			<div className="flex justify-between items-center mb-4">
				<h1 className="text-3xl font-bold">{data.title}</h1>
				<div className="flex space-x-2">
					<button
						onClick={() => setIsFavorite(!isFavorite)}
						className="p-2 rounded-full hover:bg-gray-100"
						aria-label={
							isFavorite ? 'Remove from favorites' : 'Add to favorites'
						}
					>
						<Heart
							size={24}
							className={
								isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'
							}
						/>
					</button>
					<button
						className="p-2 rounded-full hover:bg-gray-100"
						aria-label="Share"
					>
						<Share2 size={24} className="text-gray-500" />
					</button>
				</div>
			</div>

			<div className="flex items-center text-gray-600 mb-6">
				<MapPin size={16} className="mr-1" />
				<span>
					{data.address}, {data.address}
				</span>
			</div>

			<div className="relative w-full h-90 rounded-lg overflow-hidden mb-8">
				<Image
					src={data.imageUrl || '/api/placeholder/800/400'}
					alt={data.title}
					fill
					className="object-cover"
					sizes="(max-width: 1200px) 100vw"
					priority
				/>
			</div>

			<div className="flex flex-wrap gap-4 mb-6">
				<div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg">
					<Heart size={18} className="text-yellow-500 mr-2" />
					<span className="text-gray-500 ml-1">20 Likes</span>
				</div>

				<div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg">
					<MapPin size={18} className="text-blue-500 mr-2" />
					<span className="text-gray-500 ml-1">Bali</span>
				</div>
			</div>

			<div className="mb-8">
				<h2 className="text-xl font-semibold mb-3">About this destination</h2>
				<div className="text-gray-700 space-y-4">
					<p>{data.description}</p>
				</div>
			</div>

			<div className="flex flex-col sm:flex-row gap-4 mt-8">
				<Link
					href={`/book/${data.id}`}
					className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors"
				>
					Plan Your Trip
				</Link>
				<Link
					href={`/attractions/${data.address}`}
					className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium text-center hover:bg-blue-50 transition-colors"
				>
					Explore Attractions
				</Link>
			</div>
		</div>
	);
}
