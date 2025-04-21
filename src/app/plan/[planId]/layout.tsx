import PlanDetailSkeleton from '@/components/Plan/PlanDetailSkeleton';
import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Suspense fallback={<PlanDetailSkeleton />}>{children}</Suspense>
		</>
	);
}
