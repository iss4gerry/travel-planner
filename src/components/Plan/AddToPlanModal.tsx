import { PlanDetailResponse, PlanResponse } from '@/types/plan';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AddToPlanModal({
	modalStatus,
}: {
	modalStatus: boolean;
}) {
	const queryClient = useQueryClient();
	const params = useParams<{ destinationId: string }>();
	const [selectedPlan, setSelectedPlan] = useState<{
		planId: string | null;
		dayId: string | null;
	}>({
		planId: null,
		dayId: null,
	});

	useEffect(() => {
		if (!modalStatus) {
			setSelectedPlan({ planId: null, dayId: null });
		}
	}, [modalStatus]);

	const fetchPlan = async () => {
		const result = await fetch('/api/plans');
		if (!result.ok) {
			throw new Error('Something went wrong');
		}

		const response: { data: PlanResponse[] } = await result.json();
		return response.data;
	};

	const { data, isLoading, error } = useQuery({
		queryKey: ['plan'],
		queryFn: fetchPlan,
		enabled: modalStatus,
	});

	const { data: planDetails, isLoading: isPlanDetailsLoading } = useQuery({
		queryKey: ['plan', selectedPlan.planId],
		queryFn: async () => {
			if (!selectedPlan.planId) return null;

			const result = await fetch(`/api/plans/${selectedPlan.planId}`);
			if (!result.ok) {
				throw new Error('Something went wrong');
			}

			const response: { data: PlanDetailResponse } = await result.json();
			return response.data;
		},
		enabled: !!selectedPlan.planId,
	});

	const handlePlanChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedPlan((prev) => {
			return { ...prev, planId: event.target.value };
		});
	};

	const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedPlan((prev) => {
			return { ...prev, dayId: event.target.value };
		});
	};
	const addToPlanMutation = useMutation({
		mutationFn: async (data: {
			planDetailId: string;
			destinationId: string;
			time: string;
		}) => {
			const response = await fetch('/api/plans/destinations', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error('Failed to add item to plan');
			}

			return await response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['plans'] });
		},
		onError: (error) => {
			console.error('Failed to add to plan:', error);
		},
	});

	const handleSubmit = () => {
		if (selectedPlan.dayId && selectedPlan.planId && params.destinationId) {
			addToPlanMutation.mutate({
				planDetailId: selectedPlan.dayId,
				destinationId: params.destinationId,
				time: '12:00 PM',
			});
		}
	};

	return (
		<dialog id="add_to_plan_modal" className="modal" open={modalStatus}>
			<div className="modal-box">
				<form method="dialog">
					<h3 className="font-bold text-lg mb-4">Add to Plan</h3>

					{isLoading ? (
						<div className="skeleton w-full h-24"></div>
					) : error ? (
						<div className="alert alert-error">
							<p>Failed to load plans. Please try again.</p>
						</div>
					) : (
						<div className="space-y-4">
							<div>
								<label
									htmlFor="plan-select"
									className="block font-semibold mb-1"
								>
									Select Plan:
								</label>
								<select
									id="plan-select"
									className="select select-bordered w-full"
									onChange={handlePlanChange}
									value={selectedPlan.planId || ''}
								>
									<option value="" disabled>
										-- Choose a Plan --
									</option>
									{data?.map((planItem) => (
										<option key={planItem.id} value={planItem.id}>
											{planItem.name}
										</option>
									))}
								</select>
							</div>

							<div>
								<label
									htmlFor="day-select"
									className="block font-semibold mb-1"
								>
									Select Day:
								</label>
								{isPlanDetailsLoading ? (
									<div className="skeleton w-full h-10"></div>
								) : (
									<select
										id="day-select"
										disabled={!selectedPlan.planId}
										className="select select-bordered w-full"
										onChange={handleDayChange}
										value={selectedPlan.dayId || ''}
									>
										<option value="" disabled>
											-- Choose a Day --
										</option>
										{planDetails?.planDetails?.map((day) => (
											<option key={day.id} value={day.id}>
												{`Day ${day.day}`}
											</option>
										))}
									</select>
								)}
							</div>

							<div className="modal-action">
								<button className="btn btn-outline">Cancel</button>
								<button
									className="btn btn-primary"
									onClick={handleSubmit}
									type="button"
								>
									Add to Plan
								</button>
							</div>
						</div>
					)}
				</form>
			</div>
		</dialog>
	);
}
