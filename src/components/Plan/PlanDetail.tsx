'use client';

import { PlanDetailResponse } from '@/types/plan';
import { useState } from 'react';
import OverviewView from './OverviewView';
import DayView from './DayView';
import { format } from 'date-fns';
import { getThemeColor } from '@/utils/planThemeColor';

export default function PlanDetail({
	planDetail,
}: {
	planDetail: PlanDetailResponse;
}) {
	const [selectedDay, setSelectedDay] = useState(1);

	if (!planDetail) {
		return (
			<div className="flex items-center justify-center h-screen text-gray-500">
				No itinerary data available
			</div>
		);
	}

	const sortedPlanDetails = [...planDetail.planDetails].sort(
		(a, b) => a.day - b.day
	);

	return (
		<div className="min-h-screen w-full">
			<div className="bg-white rounded-lg shadow-md p-6 mb-6">
				<div className="flex flex-col md:flex-row md:justify-between md:items-center">
					<div>
						<h1 className="text-2xl md:text-3xl font-bold text-primary">
							{planDetail.name}
						</h1>
						<p className="text-gray-600">
							{format(new Date(planDetail.startDate), 'EEE, MMMM d, yyyy')} -{' '}
							{format(new Date(planDetail.endDate), 'EEE, MMMM d, yyyy')}
						</p>
					</div>
					<div className="mt-4 md:mt-0">
						<span className="text-base-100 px-4 py-2 rounded-full font-medium flex justify-end">
							{planDetail.travelTheme.split('/').map((t) => (
								<div className="flex flex-row">
									<p className={`text-base-100 badge ml-2 ${getThemeColor(t)}`}>
										{t}
									</p>
								</div>
							))}
						</span>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
					<div className="bg-base-100 p-4 rounded-md">
						<p className="text-gray-500 text-sm">Location</p>
						<p className="font-medium">{planDetail.city}</p>
					</div>
					<div className="bg-base-100 p-4 rounded-md">
						<p className="text-gray-500 text-sm">Travel Companion</p>
						<p className="font-medium">{planDetail.travelCompanion}</p>
					</div>
					<div className="bg-base-100 p-4 rounded-md">
						<p className="text-gray-500 text-sm">Budget</p>
						<p className="font-medium">
							Rp {planDetail.budget.toLocaleString()}
						</p>
					</div>
				</div>
			</div>

			<div className="mb-6 overflow-x-auto">
				<div className="flex space-x-2 min-w-max">
					<button
						className={`px-4 py-2 rounded-full font-medium hover:cursor-pointer ${
							selectedDay === 0
								? 'bg-primary text-white'
								: 'bg-white text-gray-700 hover:bg-gray-100'
						}`}
						onClick={() => setSelectedDay(0)}
					>
						Overview
					</button>

					{sortedPlanDetails.map((day) => (
						<button
							key={day.id}
							className={`px-4 py-2 rounded-full font-medium hover:cursor-pointer ${
								selectedDay === day.day
									? 'bg-primary text-white'
									: 'bg-white text-gray-700 hover:bg-gray-100'
							}`}
							onClick={() => setSelectedDay(day.day)}
						>
							Day {day.day}
						</button>
					))}
				</div>
			</div>

			{selectedDay === 0 ? (
				<OverviewView
					planDetails={sortedPlanDetails}
					setSelectedDay={setSelectedDay}
				/>
			) : (
				<DayView
					dayDetail={sortedPlanDetails.find((day) => day.day === selectedDay)!}
				/>
			)}
		</div>
	);
}
