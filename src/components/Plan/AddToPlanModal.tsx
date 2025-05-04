import {
	addBannerToPlan,
	addDestinationToPlan,
} from '@/lib/services/destination-service';
import { PlanDetailResponse, PlanResponse } from '@/types/plan';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Clock10Icon } from 'lucide-react';

export default function AddToPlanModal({
	modalStatus,
	onClose,
	mode,
}: {
	modalStatus: boolean;
	onClose: () => void;
	mode: string;
}) {
	const queryClient = useQueryClient();
	const params = useParams<{ destinationId: string; bannerId: string }>();
	const [selectedPlan, setSelectedPlan] = useState<{
		planId: string | null;
		dayId: string | null;
	}>({
		planId: null,
		dayId: null,
	});
	const [selectedTime, setSelectedTime] = useState('12:00');
	const [timeFormat, setTimeFormat] = useState<'AM' | 'PM'>('PM');

	useEffect(() => {
		if (!modalStatus) {
			setSelectedPlan({ planId: null, dayId: null });
			setSelectedTime('12:00');
			setTimeFormat('PM');
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
		staleTime: 1000 * 60 * 5,
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
		staleTime: 1000 * 60 * 5,
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

	const formatTo12Hour = (time24: string): string => {
		if (!time24) return '';

		const [hourStr, minute] = time24.split(':');
		const hour = parseInt(hourStr, 10);

		if (isNaN(hour)) return '';

		const period = hour >= 12 ? 'PM' : 'AM';
		const hour12 = hour % 12 || 12;

		return `${hour12}:${minute} ${period}`;
	};

	const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newTime = formatTo12Hour(event.target.value);
		setSelectedTime(newTime);
	};

	const addToPlanMutation = useMutation({
		mutationFn: (data: any) => {
			if (mode === 'destination') {
				return addDestinationToPlan(data);
			} else {
				return addBannerToPlan(data);
			}
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['plans'] });
			toast.success(`${mode.toUpperCase()} added to plan successfully!`);
			onClose();
		},
		onError: (error) => {
			console.error(`Failed to add to ${mode}:`, error);
			toast.error(`Failed to add ${mode} to plan. Please try again.`);
		},
	});

	const handleSubmit = () => {
		if (mode === 'destination') {
			if (
				!selectedPlan?.dayId ||
				!selectedPlan?.planId ||
				!params?.destinationId
			) {
				toast.error('Please select both a plan and a day');
				return;
			}
			addToPlanMutation.mutate({
				planDetailId: selectedPlan.dayId,
				destinationId: params.destinationId,
				time: selectedTime,
			});
		} else {
			if (!selectedPlan?.dayId || !selectedPlan?.planId || !params?.bannerId) {
				toast.error('Please select both a plan and a day');
				return;
			}
			addToPlanMutation.mutate({
				planDetailId: selectedPlan.dayId,
				bannerId: params.bannerId,
				time: selectedTime,
			});
		}
	};

	return (
		<div>
			<Toaster position="top-center" reverseOrder={false} />
			<dialog
				id="add_to_plan_modal"
				className="modal modal-bottom sm:modal-middle"
				open={modalStatus}
			>
				<div className="modal-box bg-white dark:bg-gray-800 shadow-lg rounded-lg">
					<form method="dialog">
						<h3 className="font-bold text-xl mb-6 text-center">
							Add to Your Travel Plan
						</h3>

						{isLoading ? (
							<div className="flex flex-col gap-4 animate-pulse">
								<div className="skeleton bg-gray-200 w-full h-12 rounded"></div>
								<div className="skeleton bg-gray-200 w-full h-12 rounded"></div>
								<div className="skeleton bg-gray-200 w-full h-12 rounded"></div>
							</div>
						) : error ? (
							<div className="alert alert-error bg-red-100 border-red-500 text-red-700 p-4 rounded-lg">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="stroke-current shrink-0 h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<p>Failed to load plans. Please try again.</p>
							</div>
						) : (
							<div className="space-y-6">
								<div className="form-control">
									<label htmlFor="plan-select" className="label">
										<span className="label-text font-medium text-gray-700 dark:text-gray-300">
											Select Plan
										</span>
									</label>
									<select
										id="plan-select"
										className="select select-bordered bg-white dark:bg-gray-700 w-full focus:ring-2 focus:ring-blue-500"
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

								<div className="form-control">
									<label htmlFor="day-select" className="label">
										<span className="label-text font-medium text-gray-700 dark:text-gray-300">
											Select Day
										</span>
									</label>
									{isPlanDetailsLoading ? (
										<div className="skeleton bg-gray-200 w-full h-10 rounded"></div>
									) : (
										<select
											id="day-select"
											disabled={!selectedPlan.planId}
											className="select select-bordered bg-white dark:bg-gray-700 w-full focus:ring-2 focus:ring-blue-500"
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

								<div className="form-control">
									<label className="label">
										<span className="label-text font-medium text-gray-700 dark:text-gray-300">
											Select Time
										</span>
									</label>
									<div className="flex items-center gap-3">
										<div className="relative flex-1">
											<Clock10Icon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
											<input
												type="time"
												className="input input-bordered pl-4 w-full bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
												onChange={handleTimeChange}
											/>
										</div>
									</div>
								</div>

								<div className="modal-action flex justify-end gap-3 pt-4 ">
									<button
										className="btn btn-outline border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
										onClick={(e) => {
											e.preventDefault();
											onClose();
										}}
									>
										Cancel
									</button>
									<button
										className={`btn ${
											addToPlanMutation.isPending
												? 'loading btn-disabled'
												: 'btn-primary bg-blue-600 hover:bg-blue-700'
										}`}
										onClick={(e) => {
											e.preventDefault();
											handleSubmit();
										}}
										type="button"
										disabled={addToPlanMutation.isPending}
									>
										{addToPlanMutation.isPending ? 'Adding...' : 'Add to Plan'}
									</button>
								</div>
							</div>
						)}
					</form>
				</div>
				<div className="modal-backdrop bg-black/30" onClick={onClose}></div>
			</dialog>
		</div>
	);
}
