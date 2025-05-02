'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, UserPlus, X } from 'lucide-react';

// Static data

export interface BannerAd {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	link: string;
	createdAt: string;
}

export interface Destination {
	id: string;
	name: string;
	location: string;
	description: string;
	imageUrl: string;
	createdAt: string;
}

const initialBannerAds: BannerAd[] = [
	{
		id: '1',
		title: 'Summer Vacation Special',
		description: 'Get 20% off on all summer vacation packages',
		imageUrl: '/placeholder.svg?height=200&width=600',
		link: 'https://example.com/summer',
		createdAt: new Date().toISOString(),
	},
	{
		id: '2',
		title: 'Winter Escape',
		description: 'Explore winter destinations with special discounts',
		imageUrl: '/placeholder.svg?height=200&width=600',
		link: 'https://example.com/winter',
		createdAt: new Date().toISOString(),
	},
];

const initialDestinations: Destination[] = [
	{
		id: '1',
		name: 'Bali Paradise',
		location: 'Bali, Indonesia',
		description: "Experience the beauty of Bali's beaches and culture",
		imageUrl: '/placeholder.svg?height=300&width=400',
		createdAt: new Date().toISOString(),
	},
	{
		id: '2',
		name: 'Swiss Alps',
		location: 'Switzerland',
		description: 'Majestic mountains and scenic landscapes',
		imageUrl: '/placeholder.svg?height=300&width=400',
		createdAt: new Date().toISOString(),
	},
	{
		id: '3',
		name: 'Tokyo Adventure',
		location: 'Tokyo, Japan',
		description: 'Explore the vibrant city life and traditional culture',
		imageUrl: '/placeholder.svg?height=300&width=400',
		createdAt: new Date().toISOString(),
	},
];

export default function Home() {
	const [bannerAds, setBannerAds] = useState<BannerAd[]>(initialBannerAds);
	const [destinations, setDestinations] =
		useState<Destination[]>(initialDestinations);
	const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
	const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);

	const handleAddBannerAd = (
		newBannerAd: Omit<BannerAd, 'id' | 'createdAt'>
	) => {
		const bannerAd: BannerAd = {
			...newBannerAd,
			id: (bannerAds.length + 1).toString(),
			createdAt: new Date().toISOString(),
		};
		setBannerAds([...bannerAds, bannerAd]);
		setIsBannerModalOpen(false);
	};

	const handleAddDestination = (
		newDestination: Omit<Destination, 'id' | 'createdAt'>
	) => {
		const destination: Destination = {
			...newDestination,
			id: (destinations.length + 1).toString(),
			createdAt: new Date().toISOString(),
		};
		setDestinations([...destinations, destination]);
		setIsDestinationModalOpen(false);
	};

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

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{bannerAds.map((ad) => (
						<div
							key={ad.id}
							className={`card 'bg-blue-50 border-2 border-blue-300 bg-base-100'shadow-xl transition-all hover:shadow-2xl`}
						>
							<figure>
								<Image
									src={ad.imageUrl || '/placeholder.svg'}
									alt={ad.title}
									width={600}
									height={200}
									className="w-full h-48 object-cover"
								/>
							</figure>
							<div className="card-body">
								<div className="flex justify-between items-start">
									<h3 className="card-title">{ad.title}</h3>

									<div className="badge badge-primary gap-1">
										<UserPlus size={14} />
										<span>Added by you</span>
									</div>
								</div>
								<p>{ad.description}</p>
								<div className="card-actions justify-end mt-2">
									<a
										href={ad.link}
										target="_blank"
										rel="noopener noreferrer"
										className="btn btn-sm btn-outline"
									>
										View Link
									</a>
								</div>
								<div className="text-xs text-gray-500 mt-2">
									Created: {new Date(ad.createdAt).toLocaleDateString()}
								</div>
							</div>
						</div>
					))}
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

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{destinations.map((destination) => (
						<div key={destination.id} className="card bg-base-100 shadow-xl">
							<figure>
								<Image
									src={destination.imageUrl || '/placeholder.svg'}
									alt={destination.name}
									width={400}
									height={300}
									className="w-full h-56 object-cover"
								/>
							</figure>
							<div className="card-body">
								<h3 className="card-title">{destination.name}</h3>
								<p className="text-sm font-medium text-gray-600">
									{destination.location}
								</p>
								<p className="mt-2">{destination.description}</p>
								<div className="text-xs text-gray-500 mt-2">
									Created:{' '}
									{new Date(destination.createdAt).toLocaleDateString()}
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			<BannerAdModal
				isOpen={isBannerModalOpen}
				onClose={() => setIsBannerModalOpen(false)}
				onSubmit={handleAddBannerAd}
			/>

			<DestinationModal
				isOpen={isDestinationModalOpen}
				onClose={() => setIsDestinationModalOpen(false)}
				onSubmit={handleAddDestination}
			/>
		</main>
	);
}

interface BannerAdModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (bannerAd: Omit<BannerAd, 'id' | 'createdAt'>) => void;
}

export function BannerAdModal({
	isOpen,
	onClose,
	onSubmit,
}: BannerAdModalProps) {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		imageUrl: '/placeholder.svg?height=200&width=600', // Default placeholder
		link: '',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
		// Reset form
		setFormData({
			title: '',
			description: '',
			imageUrl: '/placeholder.svg?height=200&width=600',
			link: '',
		});
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="modal-box w-11/12 max-w-2xl">
				<div className="flex justify-between items-center mb-4">
					<h3 className="font-bold text-lg">Create New Banner Ad</h3>
					<button onClick={onClose} className="btn btn-sm btn-circle">
						<X size={18} />
					</button>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="form-control mb-4">
						<label className="label">
							<span className="label-text">Title</span>
						</label>
						<input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleChange}
							placeholder="Enter banner title"
							className="input input-bordered w-full"
							required
						/>
					</div>

					<div className="form-control mb-4">
						<label className="label">
							<span className="label-text">Description</span>
						</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleChange}
							placeholder="Enter banner description"
							className="textarea textarea-bordered w-full"
							required
						/>
					</div>

					<div className="form-control mb-4">
						<label className="label">
							<span className="label-text">Image URL</span>
						</label>
						<input
							type="text"
							name="imageUrl"
							value={formData.imageUrl}
							onChange={handleChange}
							placeholder="Enter image URL"
							className="input input-bordered w-full"
							required
						/>
					</div>

					<div className="form-control mb-6">
						<label className="label">
							<span className="label-text">Link</span>
						</label>
						<input
							type="url"
							name="link"
							value={formData.link}
							onChange={handleChange}
							placeholder="Enter destination URL"
							className="input input-bordered w-full"
							required
						/>
					</div>

					<div className="modal-action">
						<button type="button" onClick={onClose} className="btn">
							Cancel
						</button>
						<button type="submit" className="btn btn-primary">
							Create Banner Ad
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

interface DestinationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (destination: Omit<Destination, 'id' | 'createdAt'>) => void;
}

export function DestinationModal({
	isOpen,
	onClose,
	onSubmit,
}: DestinationModalProps) {
	const [formData, setFormData] = useState({
		name: '',
		location: '',
		description: '',
		imageUrl: '/placeholder.svg?height=300&width=400',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
		setFormData({
			name: '',
			location: '',
			description: '',
			imageUrl: '/placeholder.svg?height=300&width=400',
		});
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="modal-box w-11/12 max-w-2xl">
				<div className="flex justify-between items-center mb-4">
					<h3 className="font-bold text-lg">Create New Destination</h3>
					<button onClick={onClose} className="btn btn-sm btn-circle">
						<X size={18} />
					</button>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="form-control mb-4">
						<label className="label">
							<span className="label-text">Name</span>
						</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							placeholder="Enter destination name"
							className="input input-bordered w-full"
							required
						/>
					</div>

					<div className="form-control mb-4">
						<label className="label">
							<span className="label-text">Location</span>
						</label>
						<input
							type="text"
							name="location"
							value={formData.location}
							onChange={handleChange}
							placeholder="Enter location (e.g., City, Country)"
							className="input input-bordered w-full"
							required
						/>
					</div>

					<div className="form-control mb-4">
						<label className="label">
							<span className="label-text">Description</span>
						</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleChange}
							placeholder="Enter destination description"
							className="textarea textarea-bordered w-full"
							required
						/>
					</div>

					<div className="form-control mb-6">
						<label className="label">
							<span className="label-text">Image URL</span>
						</label>
						<input
							type="text"
							name="imageUrl"
							value={formData.imageUrl}
							onChange={handleChange}
							placeholder="Enter image URL"
							className="input input-bordered w-full"
							required
						/>
					</div>

					<div className="modal-action">
						<button type="button" onClick={onClose} className="btn">
							Cancel
						</button>
						<button type="submit" className="btn btn-primary">
							Create Destination
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
