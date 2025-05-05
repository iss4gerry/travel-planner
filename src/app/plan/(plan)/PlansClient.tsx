'use client';

import { useState } from 'react';
import { FilterIcon, MapPin } from 'lucide-react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPlan } from '@/lib/services/plan-service';
import PlanListItem from '@/components/Plan/PlanCard';
import { useSearchParams } from 'next/navigation';
import { parseQueryParams } from '@/lib/validations/query-schema';
import Pagination from '@/components/UI/Pagination';

export default function TravelPlans() {
	const searchParams = useSearchParams();

	const page = Number.parseInt(searchParams.get('page') || '1', 10);
	const limit = Number.parseInt(searchParams.get('limit') || '8', 10);
	const sort = searchParams.get('sort') || 'createdAt';
	const order =
		(searchParams.get('order') || 'desc').toLowerCase() === 'asc'
			? 'asc'
			: 'desc';

	const params = parseQueryParams({ page, limit, sort, order });
	const { data } = useSuspenseQuery({
		queryKey: ['plans', params.page, params.limit, params.sort, params.order],
		queryFn: () => fetchPlan(params),
		staleTime: 1000 * 60 * 5,
	});

	const { plans, pagination } = data;

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

	const hasNoPlans = plans.length === 0;

	return (
		<div className="container bg-base-100 mx-auto px-4 pb-8">
			{!hasNoPlans && (
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
			)}

			{hasNoPlans ? (
				<div className="flex flex-col items-center justify-center py-16 px-4 text-center">
					<div className="bg-gray-100 p-6 rounded-full mb-6">
						<MapPin className="h-16 w-16 text-gray-400" />
					</div>
					<h3 className="text-2xl font-bold mb-2">No Travel Plans Yet</h3>
					<p className="text-gray-500 max-w-md mb-8">
						You haven&apos;t created any travel plans yet. Start planning your
						next adventure by creating your first travel plan.
					</p>
				</div>
			) : (
				<>
					<div className="flex flex-col">
						<div className="bg-white rounded-lg shadow divide-y divide-gray-200">
							{filteredPlans.map((plan) => (
								<PlanListItem plan={plan} key={plan.id} />
							))}
						</div>
					</div>

					{activeTheme !== null && filteredPlans.length === 0 && (
						<div className="alert alert-info mt-6">
							<div>
								<span>No travel plans found with the selected filter.</span>
							</div>
						</div>
					)}
					<Pagination pagination={pagination} url="plan" />
				</>
			)}
		</div>
	);
}
