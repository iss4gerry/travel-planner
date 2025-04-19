'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPlan } from '@/lib/services/plan-service';
import PlanCard from '@/components/Plan/PlanCard';
import { Link, Plus } from 'lucide-react';

export default function PlansClient() {
	const { data, isLoading } = useQuery({
		queryKey: ['plans'],
		queryFn: fetchPlan,
	});

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<div>
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
		</div>
	);
}
