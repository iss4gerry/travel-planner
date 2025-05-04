'use client';

import { useState } from 'react';
import { Plus, UserPlus, X } from 'lucide-react';
import { BannerResponse } from '@/types/banner';
import { DestinationResponse } from '@/types/destination';
import HorizontalCard from '@/components/Dashboard/HorizontalCard';
import { useSession } from 'next-auth/react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { useQuery } from '@tanstack/react-query';
import { fetchUserDestinations } from '@/lib/services/dashboard-service';

const initialBannerAds: BannerResponse[] = [
	{
		id: '1',
		userId: 'user_001',
		imageUrl:
			'https://lp-cms-production.imgix.net/2019-06/shutterstock_160155083.jpg',
		title: 'Summer Vacation Special',
		description: 'Get 20% off on all summer vacation packages',
		startDate: '2025-06-01',
		address: 'Bali, Indonesia',
		cost: 5000000,
		categoryId: 'cat_beach',
		targetUrl: 'https://example.com/summer',
		bannerDuration: 30,
		validUntil: new Date('2025-06-30'),
		isActive: true,
		isPaid: true,
		createdAt: new Date('2025-05-01'),
		updatedAt: new Date('2025-05-01'),
	},
	{
		id: '2',
		userId: 'user_002',
		imageUrl:
			'https://lp-cms-production.imgix.net/2019-06/shutterstock_160155083.jpg',
		title: 'Winter Escape',
		description: 'Explore winter destinations with special discounts',
		startDate: '2025-12-01',
		address: 'Sapporo, Japan',
		cost: 8000000,
		categoryId: 'cat_snow',
		targetUrl: 'https://example.com/winter',
		bannerDuration: 45,
		validUntil: new Date('2026-01-15'),
		isActive: true,
		isPaid: false,
		createdAt: new Date('2025-05-02'),
		updatedAt: new Date('2025-05-02'),
	},
	{
		id: '3',
		userId: 'user_003',
		imageUrl:
			'https://lp-cms-production.imgix.net/2019-06/shutterstock_160155083.jpg',
		title: 'City Lights Tour',
		description: 'Discover the nightlife in the world’s biggest cities',
		startDate: '2025-07-15',
		address: 'New York, USA',
		cost: 10000000,
		categoryId: 'cat_city',
		targetUrl: 'https://example.com/citylights',
		bannerDuration: 60,
		validUntil: new Date('2025-09-15'),
		isActive: false,
		isPaid: true,
		createdAt: new Date('2025-05-03'),
		updatedAt: new Date('2025-05-03'),
	},
];

const initialDestinations: DestinationResponse[] = [
	{
		id: '1',
		imageUrl:
			'https://lp-cms-production.imgix.net/2019-06/shutterstock_160155083.jpg',
		name: 'Bali Paradise',
		description: "Experience the beauty of Bali's beaches and culture",
		address: 'Jalan Pantai Kuta No.1',
		city: 'Bali',
		cost: '4500000',
		createdAt: new Date('2025-05-01'),
		updatedAt: new Date('2025-05-01'),
		categoryId: 'cat_beach',
		category: {
			name: 'Beach',
			imageUrl: '/placeholder.svg?height=100&width=100',
		},
	},
	{
		id: '2',
		imageUrl:
			'https://lp-cms-production.imgix.net/2019-06/shutterstock_160155083.jpg',
		name: 'Swiss Alps',
		description: 'Majestic mountains and scenic landscapes',
		address: 'Alpine Road 77',
		city: 'Zermatt',
		cost: '9000000',
		createdAt: new Date('2025-05-02'),
		updatedAt: new Date('2025-05-02'),
		categoryId: 'cat_mountain',
		category: {
			name: 'Mountain',
			imageUrl: '/placeholder.svg?height=100&width=100',
		},
	},
	{
		id: '3',
		imageUrl:
			'https://lp-cms-production.imgix.net/2019-06/shutterstock_160155083.jpg',
		name: 'Tokyo Adventure',
		description: 'Explore the vibrant city life and traditional culture',
		address: 'Shibuya Crossing',
		city: 'Tokyo',
		cost: '6000000',
		createdAt: new Date('2025-05-03'),
		updatedAt: new Date('2025-05-03'),
		categoryId: 'cat_city',
		category: {
			name: 'City',
			imageUrl: '/placeholder.svg?height=100&width=100',
		},
	},
];

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
