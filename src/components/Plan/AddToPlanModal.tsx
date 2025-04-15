import { PlanResponse } from '@/types/plan';
import { useQuery } from '@tanstack/react-query';

export default function AddToPlanModal({
	modalStatus,
}: {
	modalStatus: boolean;
}) {
	const fetchPlan = async () => {
		const result = await fetch('/api/plans');
		if (!result.ok) {
			throw new Error('Something went wrong');
		}

		const response: { data: PlanResponse[] } = await result.json();
		console.log(response.data);
		return response.data;
	};

	const { data, isLoading, error } = useQuery({
		queryKey: ['plan'],
		queryFn: fetchPlan,
		enabled: modalStatus,
	});

	return (
		<dialog id="my_modal_3" className="modal" open={modalStatus}>
			<div className="modal-box">
				<form method="dialog">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
						✕
					</button>
				</form>
				{isLoading || error || !data ? (
					<div className="skeleton w-full h-[450px] max-md:h-[250px]"></div>
				) : (
					data.map((plan) => <p>{plan.id}</p>)
				)}
			</div>
		</dialog>
	);
}
