'use client';

import { Itinerary, PlanDetailResponse } from '@/types/plan';
import { useEffect, useRef, useState } from 'react';
import OverviewView from './OverviewView';
import DayView from './DayView';
import { format } from 'date-fns';
import { getThemeColor } from '@/utils/planThemeColor';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	fetchItinerary,
	saveItineraryToPlan,
} from '@/lib/services/itinerary-service';
import { fetchPlanByIdClient } from '@/lib/services/plan-service';
import AiItinerary from './AiItinerary';

export default function PlanDetail({ planId }: { planId: string }) {
	const [selectedDay, setSelectedDay] = useState(1);
	const [aiItinerary, setAiItinerary] = useState<Itinerary | null>(null);
	const aiItineraryRef = useRef<HTMLDivElement>(null);
	const planOverviewRef = useRef<HTMLDivElement>(null);
	const queryClient = useQueryClient();

	const { data: planDetail } = useQuery({
		queryKey: ['plan', planId],
		queryFn: () => fetchPlanByIdClient(planId),
	});

	const { isLoading: isGeneratingItinerary, refetch: refetchItinerary } =
		useQuery({
			queryKey: ['itinerary'],
			queryFn: () => fetchItinerary(planId),
			enabled: false,
			refetchOnWindowFocus: false,
		});

	const { mutate: saveItineraryMutation, isPending: saveItineraryIsPending } =
		useMutation({
			mutationFn: () => {
				const dayKey = `day${selectedDay}` as keyof Itinerary;
				const dayData = aiItinerary?.[dayKey];

				if (!dayData) {
					throw new Error('No itinerary data available for selected day');
				}

				return saveItineraryToPlan(planId, {
					[dayKey]: dayData,
				});
			},
			onSuccess: (data) => {
				queryClient.invalidateQueries({ queryKey: ['plan', planId] });
				setAiItinerary((prev) => {
					if (!prev) return prev;
					const selectedDayKey = `day${selectedDay}` as keyof typeof prev;

					const newItinerary = { ...prev };
					delete newItinerary[selectedDayKey];

					return newItinerary;
				});
				planOverviewRef.current?.scrollIntoView({ behavior: 'smooth' });
			},
		});

	if (!planDetail) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="card card-bordered p-6 max-w-md">
					<div className="card-body items-center text-center">
						<svg
							className="w-16 h-16 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<h2 className="card-title">No Plan data available</h2>
						<p className="text-gray-500">
							Please create a new plan or select an existing one.
						</p>
					</div>
				</div>
			</div>
		);
	}

	const sortedPlanDetails = [...planDetail.planDetails].sort(
		(a, b) => a.day - b.day
	);

	const deleteDestinationFromItinerary = (placeName: string) => {
		setAiItinerary((prev) => {
			if (!prev) return prev;

			const selectedDayKey = `day${selectedDay}` as keyof typeof prev;

			const updatedDayDestinations = prev[selectedDayKey].filter(
				(d) => d.placeName !== placeName
			);
			return {
				...prev,
				[selectedDayKey]: updatedDayDestinations,
			};
		});
	};

	useEffect(() => {
		if (!isGeneratingItinerary && aiItinerary) {
			aiItineraryRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
	}, [isGeneratingItinerary, aiItinerary]);

	const generateAIItinerary = async () => {
		const { data } = await refetchItinerary();
		if (data) {
			setAiItinerary(data);
		}

		aiItineraryRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const saveItinerary = () => {
		saveItineraryMutation();
	};

	const hasAiItineraryForSelectedDay =
		aiItinerary &&
		aiItinerary[`day${selectedDay}`] &&
		aiItinerary[`day${selectedDay}`].length > 0;

	return (
		<div className="min-h-screen w-full pb-8" ref={planOverviewRef}>
			<div className="card bg-base-100 shadow-xl mb-6">
				<div className="card-body">
					<div className="flex flex-col md:flex-row md:justify-between md:items-center">
						<div>
							<h1 className="text-2xl md:text-3xl font-bold text-primary">
								{planDetail.name}
							</h1>
							<p className="text-gray-600 mt-1">
								{format(new Date(planDetail.startDate), 'EEE, MMMM d, yyyy')} -{' '}
								{format(new Date(planDetail.endDate), 'EEE, MMMM d, yyyy')}
							</p>
						</div>
						<div className="mt-4 md:mt-0 flex flex-wrap gap-2 justify-end">
							{planDetail.travelTheme.split('/').map((t) => (
								<div key={t} className={`badge badge-lg ${getThemeColor(t)}`}>
									{t}
								</div>
							))}
						</div>
					</div>

					<div className="divider my-2"></div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="stat bg-base-200 rounded-box">
							<div className="stat-title">Location</div>
							<div className="stat-value text-lg">{planDetail.city}</div>
						</div>
						<div className="stat bg-base-200 rounded-box">
							<div className="stat-title">Travel Companion</div>
							<div className="stat-value text-lg">
								{planDetail.travelCompanion}
							</div>
						</div>
						<div className="stat bg-base-200 rounded-box">
							<div className="stat-title">Budget</div>
							<div className="stat-value text-lg">
								Rp {planDetail.budget.toLocaleString()}
							</div>
						</div>
					</div>

					<div className="mt-6 flex justify-center">
						<button
							onClick={generateAIItinerary}
							disabled={isGeneratingItinerary}
							className={`btn btn-primary btn-lg gap-2 ${
								isGeneratingItinerary ? 'loading' : ''
							}`}
						>
							{isGeneratingItinerary ? (
								'Generating Itinerary...'
							) : (
								<>
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
										/>
									</svg>
									Generate AI Itinerary
								</>
							)}
						</button>
					</div>
				</div>
			</div>

			<div className="tabs tabs-boxed mb-6 overflow-x-auto flex flex-nowrap">
				<button
					className={`tab tab-lg ${selectedDay === 0 ? 'tab-active' : ''}`}
					onClick={() => setSelectedDay(0)}
				>
					Overview
				</button>

				{sortedPlanDetails.map((day) => (
					<button
						key={day.id}
						className={`tab tab-lg ${
							selectedDay === day.day ? 'tab-active' : ''
						}`}
						onClick={() => setSelectedDay(day.day)}
					>
						Day {day.day}
					</button>
				))}
			</div>

			{selectedDay === 0 ? (
				<OverviewView
					planDetails={sortedPlanDetails}
					setSelectedDay={setSelectedDay}
				/>
			) : (
				<div>
					<DayView
						dayDetail={
							sortedPlanDetails.find((day) => day.day === selectedDay)!
						}
					/>

					{hasAiItineraryForSelectedDay && (
						<AiItinerary
							aiItineraryRef={aiItineraryRef}
							selectedDay={selectedDay}
							saveItinerary={saveItinerary}
							saveItineraryIsPending={saveItineraryIsPending}
							deleteDestinationFromItinerary={deleteDestinationFromItinerary}
							aiItinerary={aiItinerary}
						/>
					)}
				</div>
			)}
		</div>
	);
}
