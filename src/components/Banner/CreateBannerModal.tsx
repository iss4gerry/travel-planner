'use client';

import type React from 'react';

import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { z } from 'zod';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import {
	ImageIcon,
	MapPinIcon,
	DollarSignIcon,
	TagIcon,
	BuildingIcon,
} from 'lucide-react';
import { fetchCategories } from '@/lib/services/dashboard-service';
import { useSession } from 'next-auth/react';
import {
	createBannerSchema,
	type CreateBanner,
} from '@/lib/validations/banner-schema';
import { createBanner } from '@/lib/services/banner-service';

export default function CreateBannerModal({
	modalStatus,
	onClose,
}: {
	modalStatus: boolean;
	onClose: () => void;
	categories?: Array<{ id: string; name: string }>;
}) {
	const { data: session } = useSession();
	const queryClient = useQueryClient();
	const [formData, setFormData] = useState<CreateBanner>({
		title: '',
		description: '',
		imageUrl: '',
		startDate: '',
		address: '',
		cost: '',
		categoryId: '',
		targetUrl: '',
		bannerDuration: '3',
	});
	const [errors, setErrors] = useState<
		Partial<Record<keyof CreateBanner, string>>
	>({});

	const { data: categories } = useQuery({
		queryKey: ['categories'],
		queryFn: fetchCategories,
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (errors[name as keyof CreateBanner]) {
			setErrors((prev) => ({
				...prev,
				[name]: undefined,
			}));
		}
	};

	const createBannerMutation = useMutation({
		mutationFn: () => createBanner(formData),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['user-banner', session?.user.id],
			});
			queryClient.invalidateQueries({
				queryKey: ['banners'],
			});
			toast.success('Banner created successfully!');
			onClose();
			setFormData({
				title: '',
				description: '',
				imageUrl: '',
				startDate: '',
				address: '',
				cost: '',
				categoryId: '',
				targetUrl: '',
				bannerDuration: '3',
			});
		},
		onError: (error) => {
			console.error('Failed to create banner:', error);
			toast.error('Failed to create banner. Please try again.');
		},
	});

	const validateForm = () => {
		try {
			createBannerSchema.parse(formData);
			setErrors({});
			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				const newErrors: Partial<Record<keyof CreateBanner, string>> = {};
				error.errors.forEach((err) => {
					if (err.path[0]) {
						newErrors[err.path[0] as keyof CreateBanner] = err.message;
					}
				});
				setErrors(newErrors);
			}
			return false;
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			createBannerMutation.mutate();
		} else {
			toast.error('Please fix the errors in the form');
		}
	};

	return (
		<div>
			<Toaster position="top-center" reverseOrder={false} />
			<dialog
				id="create_destination_modal"
				className="modal"
				open={modalStatus}
			>
				<div className="modal-box bg-white shadow-lg rounded-lg max-sm:max-h-11/12 max-sm:max-w-11/12 h-10/12 overflow-y-auto">
					<form method="dialog" onSubmit={handleSubmit}>
						<h3 className="font-bold text-xl mb-6 text-center">
							Create New Destination
						</h3>

						<div className="space-y-4">
							<div className="form-control">
								<label htmlFor="name" className="label">
									<span className="label-text font-medium text-gray-700 dark:text-gray-300">
										Banner Name
									</span>
								</label>
								<input
									id="name"
									name="title"
									type="text"
									className={`input input-bordered bg-white text-[16px] w-full focus:ring-2 focus:ring-blue-500 ${
										errors.title ? 'border-red-500' : ''
									}`}
									placeholder="Enter destination name"
									value={formData.title}
									onChange={handleChange}
								/>
								{errors.title && (
									<p className="text-red-500 text-sm mt-1">{errors.title}</p>
								)}
							</div>

							<div className="form-control">
								<label htmlFor="description" className="label">
									<span className="label-text font-medium text-gray-700 dark:text-gray-300">
										Description
									</span>
								</label>
								<textarea
									id="description"
									name="description"
									className={`textarea textarea-bordered bg-white text-[16px] w-full h-24 focus:ring-2 focus:ring-blue-500 ${
										errors.description ? 'border-red-500' : ''
									}`}
									placeholder="Enter destination description"
									value={formData.description}
									onChange={handleChange}
								/>
								{errors.description && (
									<p className="text-red-500 text-sm mt-1">
										{errors.description}
									</p>
								)}
							</div>

							<div className="form-control">
								<label htmlFor="imageUrl" className="label">
									<span className="label-text font-medium text-gray-700 dark:text-gray-300">
										Image URL
									</span>
								</label>
								<div className="relative">
									<ImageIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
									<input
										id="imageUrl"
										name="imageUrl"
										type="text"
										className={`input input-bordered pl-10 bg-white text-[16px] w-full focus:ring-2 focus:ring-blue-500 ${
											errors.imageUrl ? 'border-red-500' : ''
										}`}
										placeholder="Enter image URL"
										value={formData.imageUrl}
										onChange={handleChange}
									/>
								</div>
								{errors.imageUrl && (
									<p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>
								)}
							</div>

							<div className="form-control">
								<label htmlFor="address" className="label">
									<span className="label-text font-medium text-gray-700 dark:text-gray-300">
										Address
									</span>
								</label>
								<div className="relative">
									<MapPinIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
									<input
										id="address"
										name="address"
										type="text"
										className={`input input-bordered pl-10 bg-white text-[16px] w-full focus:ring-2 focus:ring-blue-500 ${
											errors.address ? 'border-red-500' : ''
										}`}
										placeholder="Enter address"
										value={formData.address}
										onChange={handleChange}
									/>
								</div>
								{errors.address && (
									<p className="text-red-500 text-sm mt-1">{errors.address}</p>
								)}
							</div>

							<div className="form-control">
								<label htmlFor="city" className="label">
									<span className="label-text font-medium text-gray-700 dark:text-gray-300">
										Target Url
									</span>
								</label>
								<div className="relative">
									<BuildingIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
									<input
										id="targetUrl"
										name="targetUrl"
										type="text"
										className={`input input-bordered pl-10 bg-white text-[16px] w-full focus:ring-2 focus:ring-blue-500 ${
											errors.targetUrl ? 'border-red-500' : ''
										}`}
										placeholder="Enter Social Media"
										value={formData.targetUrl}
										onChange={handleChange}
									/>
								</div>
								{errors.targetUrl && (
									<p className="text-red-500 text-sm mt-1">
										{errors.targetUrl}
									</p>
								)}
							</div>

							<div className="form-control">
								<label htmlFor="cost" className="label">
									<span className="label-text font-medium text-gray-700 dark:text-gray-300">
										Cost
									</span>
								</label>
								<div className="relative">
									<DollarSignIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
									<input
										id="cost"
										name="cost"
										type="number"
										className={`input input-bordered pl-10 bg-white text-[16px] w-full focus:ring-2 focus:ring-blue-500 ${
											errors.cost ? 'border-red-500' : ''
										}`}
										placeholder="Enter cost"
										value={formData.cost}
										onChange={handleChange}
									/>
								</div>
								{errors.cost && (
									<p className="text-red-500 text-sm mt-1">{errors.cost}</p>
								)}
							</div>

							<div className="form-control">
								<label htmlFor="categoryId" className="label">
									<span className="label-text font-medium text-gray-700 dark:text-gray-300">
										Category
									</span>
								</label>
								<div className="relative">
									<TagIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
									<select
										id="categoryId"
										name="categoryId"
										className={`select select-bordered pl-10 bg-white text-[16px] w-full focus:ring-2 focus:ring-blue-500 ${
											errors.categoryId ? 'border-red-500' : ''
										}`}
										value={formData.categoryId}
										onChange={handleChange}
									>
										<option value="">-- Select Category --</option>
										{categories &&
											categories.map((category) => (
												<option key={category.id} value={category.id}>
													{category.name}
												</option>
											))}
									</select>
								</div>
								{errors.categoryId && (
									<p className="text-red-500 text-sm mt-1">
										{errors.categoryId}
									</p>
								)}
							</div>
						</div>

						<div className="modal-action flex justify-end gap-3 pt-6 max-sm:justify-center max-sm:p-3">
							<button
								type="button"
								className="btn btn-outline border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 max-sm:basis-1/2"
								onClick={(e) => {
									e.preventDefault();
									onClose();
								}}
							>
								Cancel
							</button>
							<button
								type="submit"
								className={`btn max-sm:basis-1/2 ${
									createBannerMutation.isPending
										? 'loading btn-disabled'
										: 'btn-primary'
								}`}
								disabled={createBannerMutation.isPending}
							>
								{createBannerMutation.isPending
									? 'Creating...'
									: 'Create Destination'}
							</button>
						</div>
					</form>
				</div>
				<div className="modal-backdrop bg-black/30" onClick={onClose}></div>
			</dialog>
		</div>
	);
}
