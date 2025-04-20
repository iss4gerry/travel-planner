'use client';

import { useState } from 'react';
import { FilterIcon } from 'lucide-react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPlan } from '@/lib/services/plan-service';
import PlanCard from '@/components/Plan/PlanCard';

export default function TravelPlans() {
	const { data: plans, isFetching } = useSuspenseQuery({
		queryKey: ['plans'],
		queryFn: fetchPlan,
	});

	const [activeTheme, setActiveTheme] = useState<string | null>(null);

	const getThemesArray = (themeString: string): string[] => {
		return themeString.split('/').map((theme) => theme.trim());
	};

	const filteredPlans = activeTheme
		? plans.filter((plan) =>
				getThemesArray(plan.travelTheme).includes(activeTheme)
		  )
		: plans;

	const themes = Array.from(
		new Set(plans.flatMap((plan) => getThemesArray(plan.travelTheme)))
	).sort();

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex flex-wrap items-center gap-2 mb-6">
				<div className="flex items-center">
					<FilterIcon className="h-5 w-5 mr-2" />
					<span className="font-medium">Filter by theme:</span>
				</div>
				<div className="flex flex-wrap gap-2">
					<button
						className={`btn btn-sm ${
							activeTheme === null ? 'btn-active' : 'btn-outline'
						}`}
						onClick={() => setActiveTheme(null)}
					>
						All
					</button>
					{themes.map((theme) => (
						<button
							key={theme}
							className={`btn btn-sm ${
								activeTheme === theme ? 'btn-active' : 'btn-outline'
							}`}
							onClick={() => setActiveTheme(theme)}
						>
							{theme}
						</button>
					))}
				</div>
			</div>

			{isFetching ? (
				<LoadingState />
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredPlans.map((plan) => (
						<PlanCard plan={plan} key={plan.id} />
					))}
				</div>
			)}

			{filteredPlans.length === 0 && (
				<div className="alert alert-info mt-6">
					<div>
						<span>No travel plans found with the selected filter.</span>
					</div>
				</div>
			)}
		</div>
	);
}

function LoadingState() {
	return (
		<div className="w-full min-h-56">
			<div className="flex items-center justify-center min-h-40">
				<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
				<p className="ml-3 text-gray-600 font-medium">
					Loading your travel plans...
				</p>
			</div>
		</div>
	);
}
