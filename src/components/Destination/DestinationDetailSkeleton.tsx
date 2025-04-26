import { ChevronLeft } from 'lucide-react';

export default function DestinationDetailSkeleton() {
	return (
		<div className="w-full mx-auto px-4 py-6">
			<div className="flex items-center mb-6">
				<button className="flex items-center text-primary hover:cursor-pointer">
					<ChevronLeft size={20} />
					<span>Back to destinations</span>
				</button>
			</div>

			<div className="flex justify-between items-center mb-4">
				<div className="skeleton h-10 w-64"></div>
				<div className="flex space-x-2">
					<div className="skeleton w-10 h-10 rounded-full"></div>
					<div className="skeleton w-10 h-10 rounded-full"></div>
				</div>
			</div>

			<div className="flex items-center mb-6">
				<div className="skeleton h-5 w-48"></div>
			</div>

			<div className="skeleton w-full h-80 rounded-lg mb-8"></div>

			<div className="flex flex-wrap gap-4 mb-6">
				<div className="skeleton h-10 w-28 rounded-lg"></div>
				<div className="skeleton h-10 w-28 rounded-lg"></div>
			</div>

			<div className="mb-8">
				<div className="skeleton h-8 w-48 mb-3"></div>
				<div className="space-y-3">
					<div className="skeleton h-4 w-full"></div>
					<div className="skeleton h-4 w-full"></div>
					<div className="skeleton h-4 w-3/4"></div>
				</div>
			</div>

			<div className="flex flex-col sm:flex-row gap-4 mt-8">
				<div className="skeleton h-12 w-32 rounded-lg"></div>
				<div className="skeleton h-12 w-40 rounded-lg"></div>
			</div>
		</div>
	);
}
