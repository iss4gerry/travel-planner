import PlanTitle from '@/components/Plan/PlanHeader';
import PlanListSkeleton from '@/components/Plan/PlanListSkeleton';
import { Suspense } from 'react';

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="container mx-auto mt-5 bg-base-100">
			<div className="flex flex-wrap items-center gap-2 bg-base-100">
				<PlanTitle />
				<Suspense fallback={<PlanListSkeleton />}>{children}</Suspense>
			</div>
		</div>
	);
}
