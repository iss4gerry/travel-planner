export default function PlanDetailSkeleton() {
	return (
		<div className="min-h-screen w-full">
			<div className="bg-white rounded-lg shadow-md p-6 mb-6">
				<div className="flex flex-col md:flex-row md:justify-between md:items-center">
					<div>
						<div className="skeleton h-8 w-64 mb-2"></div>
						<div className="skeleton h-4 w-48"></div>
					</div>
					<div className="mt-4 md:mt-0">
						<div className="skeleton h-8 w-32 rounded-full"></div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
					<div className="bg-gray-50 p-4 rounded-md">
						<p className="text-gray-500 text-sm">Location</p>
						<div className="skeleton h-5 w-24 mt-1"></div>
					</div>
					<div className="bg-gray-50 p-4 rounded-md">
						<p className="text-gray-500 text-sm">Travel Companion</p>
						<div className="skeleton h-5 w-32 mt-1"></div>
					</div>
					<div className="bg-gray-50 p-4 rounded-md">
						<p className="text-gray-500 text-sm">Budget</p>
						<div className="skeleton h-5 w-20 mt-1"></div>
					</div>
				</div>
			</div>

			<div className="mb-6 overflow-x-auto">
				<div className="flex space-x-2 min-w-max">
					<div className="skeleton h-10 w-24 rounded-full"></div>
					<div className="skeleton h-10 w-20 rounded-full"></div>
					<div className="skeleton h-10 w-20 rounded-full"></div>
					<div className="skeleton h-10 w-20 rounded-full"></div>
					<div className="skeleton h-10 w-20 rounded-full"></div>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow-md p-6">
				<div className="space-y-6">
					<div className="p-4">
						<div className="flex justify-between items-start">
							<div>
								<div className="skeleton h-6 w-32 mb-2"></div>
								<div className="skeleton h-4 w-48 mb-1"></div>
								<div className="skeleton h-4 w-64"></div>
							</div>
							<div className="skeleton h-12 w-12 rounded-full"></div>
						</div>
						<div className="mt-4">
							<div className="skeleton h-4 w-full max-w-md mb-2"></div>
							<div className="skeleton h-4 w-full max-w-sm"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
