import { ChevronRightIcon } from 'lucide-react';

export default function PlanListSkeleton() {
	return (
		<div className="container mx-auto px-4 pb-8">
			<div className="flex flex-wrap items-center gap-2 mb-6">
				<div className="flex items-center">
					<div className="skeleton h-5 w-5 mr-2"></div>
					<div className="skeleton h-5 w-32"></div>
				</div>
				<div className="flex flex-wrap gap-2">
					<div className="skeleton h-8 w-16 rounded-full"></div>
					<div className="skeleton h-8 w-24 rounded-full"></div>
					<div className="skeleton h-8 w-20 rounded-full"></div>
					<div className="skeleton h-8 w-28 rounded-full"></div>
					<div className="skeleton h-8 w-22 rounded-full"></div>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow divide-y divide-gray-200">
				{[1, 2, 3, 4, 5].map((item) => (
					<PlanListItemSkeleton key={item} />
				))}
			</div>
		</div>
	);
}

function PlanListItemSkeleton() {
	return (
		<div className="flex items-center justify-between p-4 border-b border-gray-200">
			<div className="flex-1 min-w-0">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
					<div className="skeleton h-6 w-48 mb-2 sm:mb-0"></div>
					<div className="flex items-center gap-2 mt-1 sm:mt-0">
						<div className="skeleton h-4 w-4 rounded-full"></div>
						<div className="skeleton h-4 w-32"></div>
						<div className="skeleton h-5 w-16 rounded-full"></div>
					</div>
				</div>

				<div className="mt-2 flex flex-row max-sm:grid sm:grid-cols-3 gap-y-2 gap-x-4">
					<div className="flex items-center gap-2">
						<div className="skeleton h-4 w-4 rounded-full flex-shrink-0"></div>
						<div className="skeleton h-4 w-24"></div>
					</div>

					<div className="flex items-center gap-2">
						<div className="skeleton h-4 w-4 rounded-full flex-shrink-0"></div>
						<div className="skeleton h-4 w-28"></div>
					</div>

					<div className="flex items-center gap-2">
						<div className="skeleton h-4 w-4 rounded-full flex-shrink-0"></div>
						<div className="skeleton h-4 w-24"></div>
					</div>
				</div>

				<div className="flex flex-wrap gap-1.5 mt-3">
					<div className="skeleton h-5 w-16 rounded-full"></div>
					<div className="skeleton h-5 w-20 rounded-full"></div>
					<div className="skeleton h-5 w-18 rounded-full"></div>
				</div>
			</div>

			<ChevronRightIcon className="h-5 w-5 text-gray-200 ml-4 flex-shrink-0" />
		</div>
	);
}
