export default function DestinationDetailSkeleton() {
	return (
		<div className="animate-pulse space-y-8 w-full max-w-4xl mx-auto">
			<div className="h-8 bg-gray-200 rounded w-3/4"></div>
			<div className="h-64 bg-gray-200 rounded-lg w-full"></div>
			<div className="space-y-4">
				<div className="h-4 bg-gray-200 rounded w-1/2"></div>
				<div className="h-4 bg-gray-200 rounded w-full"></div>
				<div className="h-4 bg-gray-200 rounded w-3/4"></div>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div className="h-12 bg-gray-200 rounded"></div>
				<div className="h-12 bg-gray-200 rounded"></div>
			</div>
		</div>
	);
}
