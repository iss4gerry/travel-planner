'use client';

import { PlanResponse } from '@/types/plan';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MapPin, Calendar, Users, Eye, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function PlanCard({ plan }: { plan: PlanResponse }) {
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const queryClient = useQueryClient();

	const deletePlan = async () => {
		setIsDeleting(true);
		const result = await fetch(`api/plan/${plan.id}`);
		if (!result.ok) {
			throw new Error('Something went wrong');
		}

		const response: { data: PlanResponse } = await result.json();
		setIsDeleting(false);
		return response.data;
	};

	const deletePlanMutation = useMutation({
		mutationFn: deletePlan,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['plan'] });
		},
		onError: (error) => {
			console.error('Failed to add to plan:', error);
		},
	});

	const handleDelete = async () => {
		deletePlanMutation.mutate();
	};

	return (
		<div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
			<div className="p-5">
				<div className="flex justify-between items-start">
					<h2 className="text-xl font-semibold text-gray-900">{plan.name}</h2>
				</div>
				<div className="mt-2 space-y-2">
					<div className="flex items-center text-gray-600">
						<MapPin size={16} className="mr-2" />
						<span>{plan.city}</span>
					</div>

					<div className="flex items-center text-gray-600">
						<Calendar size={16} className="mr-2" />
						<span>
							{new Date(plan.startDate).toLocaleDateString()} -{' '}
							{new Date(plan.endDate).toLocaleDateString()}
						</span>
					</div>

					<div className="flex items-center text-gray-600">
						<Users size={16} className="mr-2" />
						<span>{plan.travelCompanion} </span>
					</div>
				</div>

				<div className="mt-4 flex justify-end space-x-2">
					<Link
						href={`/itineraries/${plan.id}`}
						className="text-blue-600 hover:text-blue-800 flex items-center"
					>
						<Eye size={16} className="mr-1" />
						View
					</Link>

					<Link
						href={`/itineraries/edit/${plan.id}`}
						className="text-indigo-600 hover:text-indigo-800 flex items-center"
					>
						<Edit size={16} className="mr-1" />
						Edit
					</Link>

					<button onClick={handleDelete}>
						<Trash2 size={16} className="mr-1" />
						{isDeleting ? 'Deleting...' : 'Delete'}
					</button>
				</div>
			</div>
		</div>
	);
}
