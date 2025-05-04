'use client';

import { useState } from 'react';
import { Plus, UserPlus, X } from 'lucide-react';
import HorizontalCard from '@/components/Dashboard/HorizontalCard';

export default function Home() {
	const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
	const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);

	return (
		<main className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold text-center mb-4">Dashboard</h1>
			<p className="text-center text-gray-600 mb-8">
				Manage your personalized banner ads and travel destinations all in one
				place
			</p>

			<section className="mb-12">
				<div className="flex justify-between items-center mb-4">
					<div>
						<h2 className="text-2xl font-semibold">Your Banner Ads</h2>
						<p className="text-sm text-gray-600">
							These are all the promotional banners you've created
						</p>
					</div>
					<button
						className="btn btn-primary"
						onClick={() => setIsBannerModalOpen(true)}
					>
						<Plus size={18} className="mr-1" /> Create Banner Ad
					</button>
				</div>

				<div className="rounded-lg divide-y divide-gray-200">
					<HorizontalCard mode="banner" />
				</div>
			</section>

			<section>
				<div className="flex justify-between items-center mb-4">
					<div>
						<h2 className="text-2xl font-semibold">Your Destination</h2>
						<p className="text-sm text-gray-600">
							These are all the destination you've created
						</p>
					</div>
					<button
						className="btn btn-primary"
						onClick={() => setIsDestinationModalOpen(true)}
					>
						<Plus size={18} className="mr-1" /> Create Destination
					</button>
				</div>

				<div className="rounded-lg divide-y divide-gray-200">
					<HorizontalCard mode="destination" />
				</div>
			</section>
		</main>
	);
}
