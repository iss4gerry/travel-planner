'use client';

import { Suspense, useState } from 'react';
import { Plus, MapIcon, LucideImages } from 'lucide-react';
import HorizontalCard from '@/components/Dashboard/HorizontalCard';
import CreateDestinationModal from '@/components/Destination/CreateDestination';
import CreateBannerModal from '@/components/Banner/CreateBannerModal';

export default function Home() {
	const [destinationModalStatus, setDestinationModalStatus] =
		useState<boolean>(false);

	const [bannerModalStatus, setBannerModalStatus] = useState<boolean>(false);

	const handleCloseDestinationModal = () => {
		setDestinationModalStatus(false);
	};

	const handleCloseBannerModal = () => {
		setBannerModalStatus(false);
	};

	return (
		<main className="container mx-auto px-4 py-8">
			<CreateDestinationModal
				modalStatus={destinationModalStatus}
				onClose={handleCloseDestinationModal}
			/>

			<CreateBannerModal
				modalStatus={bannerModalStatus}
				onClose={handleCloseBannerModal}
			/>

			<h1 className="text-3xl font-bold text-center mb-4">Dashboard</h1>
			<p className="text-center text-gray-600 mb-8">
				Manage banner ads and travel destinations created by you, all in one
				place
			</p>

			<div className="tabs tabs-lift">
				<label className="tab">
					<input type="radio" name="my_tabs_4" />
					<LucideImages width={18} className="mr-1" />
					Banner Ads
				</label>
				<div className="tab-content bg-base-100 border-base-300 p-6">
					<section className="mb-2 max-sm:flex max-sm:flex-col">
						<div className="flex justify-between items-center mb-4 max-sm:flex-col gap-2">
							<div>
								<h2 className="text-2xl font-semibold max-sm:text-center">
									Your Banner Ads
								</h2>
								<p className="text-sm text-gray-600 max-sm:text-center">
									These are all the promotional banners you&apos;ve created
								</p>
							</div>
							<button
								className="btn btn-primary max-sm:w-full"
								onClick={() => setBannerModalStatus(true)}
							>
								<Plus size={18} className="mr-1" /> Create Banner Ad
							</button>
						</div>
						<Suspense fallback={<p>Loading</p>}>
							<div className="rounded-lg divide-y divide-gray-200">
								<HorizontalCard mode="banner" />
							</div>
						</Suspense>
					</section>
				</div>

				<label className="tab">
					<input type="radio" name="my_tabs_4" defaultChecked />
					<MapIcon width={18} className="mr-1" />
					Destinations
				</label>
				<div className="tab-content bg-base-100 border-base-300 p-6">
					<section className="mb-2 max-sm:flex max-sm:flex-col">
						<div className="flex justify-between items-center mb-4 max-sm:flex-col gap-2">
							<div>
								<h2 className="text-2xl font-semibold max-sm:text-center">
									Your Destination
								</h2>
								<p className="text-sm text-gray-600 max-sm:text-center">
									These are all the destination you&apos;ve created
								</p>
							</div>
							<button
								className="btn btn-primary max-sm:w-full"
								onClick={() => setDestinationModalStatus(true)}
							>
								<Plus size={18} className="mr-1" /> Create Destination
							</button>
						</div>
						<Suspense fallback={<p>Loading</p>}>
							<div className="rounded-lg divide-y divide-gray-200">
								<HorizontalCard mode="destination" />
							</div>
						</Suspense>
					</section>
				</div>
			</div>
		</main>
	);
}
