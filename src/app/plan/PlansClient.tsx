'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { FilterIcon } from 'lucide-react';
import { TravelTheme } from '@/types/plan';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPlan } from '@/lib/services/plan-service';
import PlanCard from '@/components/Plan/PlanCard';

export default function TravelPlans() {
	const { data: plans } = useSuspenseQuery({
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

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredPlans.map((plan) => (
					<PlanCard plan={plan} key={plan.id} />
				))}
			</div>

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
