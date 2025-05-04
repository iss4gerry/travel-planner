// app/create/destination/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DestinationForm {
	name: string;
	description: string;
	location: string;
	imageUrl: string;
	categoryId: string;
}

const CreateDestination: React.FC = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState<DestinationForm>({
		name: '',
		description: '',
		location: '',
		imageUrl: '',
		categoryId: '',
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await fetch('/api/destinations', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			router.push('/dashboard');
		} catch (error) {
			console.error('Error creating destination:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="max-w-4xl mx-auto py-8 px-4">
			<h1 className="text-3xl font-bold mb-8 text-center">
				Create New Destination
			</h1>

			<form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-6">
				<div className="form-control mb-4">
					<label className="label" htmlFor="name">
						<span className="label-text">Destination Name</span>
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Enter destination name"
						className="input input-bordered w-full"
						required
					/>
				</div>

				<div className="form-control mb-4">
					<label className="label" htmlFor="description">
						<span className="label-text">Description</span>
					</label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleChange}
						placeholder="Describe this destination"
						className="textarea textarea-bordered h-32"
						required
					/>
				</div>

				<div className="form-control mb-4">
					<label className="label" htmlFor="location">
						<span className="label-text">Location</span>
					</label>
					<input
						type="text"
						id="location"
						name="location"
						value={formData.location}
						onChange={handleChange}
						placeholder="City, Country"
						className="input input-bordered w-full"
						required
					/>
				</div>

				<div className="form-control mb-4">
					<label className="label" htmlFor="imageUrl">
						<span className="label-text">Image URL</span>
					</label>
					<input
						type="url"
						id="imageUrl"
						name="imageUrl"
						value={formData.imageUrl}
						onChange={handleChange}
						placeholder="https://example.com/image.jpg"
						className="input input-bordered w-full"
						required
					/>
				</div>

				<div className="form-control mb-6">
					<label className="label" htmlFor="categoryId">
						<span className="label-text">Category</span>
					</label>
					<select
						id="categoryId"
						name="categoryId"
						value={formData.categoryId}
						onChange={handleChange}
						className="select select-bordered w-full"
						required
					>
						<option value="" disabled>
							Select a category
						</option>
						<option value="beach">Beach</option>
						<option value="mountain">Mountain</option>
						<option value="city">City</option>
						<option value="countryside">Countryside</option>
						<option value="historical">Historical</option>
					</select>
				</div>

				<div className="flex justify-end gap-4">
					<button
						type="button"
						onClick={() => router.back()}
						className="btn btn-outline"
					>
						Cancel
					</button>
					<button
						type="submit"
						className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
						disabled={isLoading}
					>
						{isLoading ? 'Creating...' : 'Create Destination'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateDestination;
