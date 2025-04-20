import PlanTitle from '@/components/Plan/PlanHeader';
import { Link, Plus, PlusIcon } from 'lucide-react';
import { Suspense } from 'react';

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="container mx-auto mt-5">
			<div className="flex flex-wrap items-center gap-2">
				<PlanTitle />
				<Suspense fallback={<LoadingState />}>{children}</Suspense>
			</div>
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
