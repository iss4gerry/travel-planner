// pages/itineraries/index.js
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import PlanCard from '@/components/Plan/PlanCard';
import { Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { PlanResponse } from '@/types/plan';

export default function ItineraryList() {
	const fetchPlan = async () => {
		const result = await fetch('api/plans');
		if (!result.ok) {
			throw new Error('Something went wrong');
		}

		const response: { data: PlanResponse[] } = await result.json();
		return response.data;
	};
	const { data, isLoading, error } = useQuery({
		queryKey: ['destinations'],
		queryFn: fetchPlan,
	});

	if (isLoading)
		return (
			<div className="flex justify-center p-8">Loading itineraries...</div>
		);
	if (error)
		return (
			<div className="bg-red-100 text-red-700 p-4 rounded">
				Something went wrong...
			</div>
		);

	return (
		<div className="mx-auto p-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">My Travel Itineraries</h1>
				<Link
					href="/itineraries/create"
					className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
				>
					<Plus size={18} className="mr-1" />
					Create New Itinerary
				</Link>
			</div>

			{!data || data.length === 0 ? (
				<div className="bg-gray-100 p-8 text-center rounded">
					<p className="text-gray-600">You don't have any plan yet.</p>
					<Link
						href="/itineraries/create"
						className="text-blue-600 font-medium mt-2 inline-block"
					>
						Plan your first trip
					</Link>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{data.map((plan) => (
						<PlanCard plan={plan} key={plan.id} />
					))}
				</div>
			)}
		</div>
	);
}
