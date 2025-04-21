import { fetchPlanById } from '@/lib/services/plan-service';
import { PlanDetailResponse } from '@/types/plan';
import { QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import PlanDetail from '@/components/Plan/PlanDetail';

export default async function Page({
	params,
}: {
	params: Promise<{ planId: string }>;
}) {
	const { planId } = await params;
	const cookieStore = (await cookies()).toString();
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ['plan', planId],
		queryFn: () => fetchPlanById(cookieStore, planId),
	});

	const plan = queryClient.getQueryData<PlanDetailResponse>(['plan', planId]);
	if (!plan) {
		throw new Error('Plan not found');
	}

	return (
		<div className="w-full">
			<PlanDetail planDetail={plan} />
		</div>
	);
}
