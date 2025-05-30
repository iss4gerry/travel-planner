import { PlanDetailResponse } from '@/types/plan';
import { format } from 'date-fns';
import { WaypointsIcon } from 'lucide-react';

export default function OverviewView({
	planDetails,
	setSelectedDay,
}: {
	planDetails: PlanDetailResponse['planDetails'];
	setSelectedDay: (day: number) => void;
}) {
	const totalDays = planDetails.length;
	const totalActivities = planDetails.reduce(
		(sum, day) =>
			sum +
			(day.activities?.length || 0) +
			(day.activitiesFromBanner?.length || 0),
		0
	);

	return (
		<div>
			<div className="bg-white rounded-lg shadow-md p-6 mb-6">
				<h2 className="text-xl font-semibold mb-4">Trip Summary</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="bg-base-100 p-4 rounded-md text-center">
						<p className="text-2xl font-bold text-primary">{totalDays}</p>
						<p className="text-gray-600">Days</p>
					</div>
					<div className="bg-base-100 p-4 rounded-md text-center">
						<p className="text-2xl font-bold text-primary">{totalActivities}</p>
						<p className="text-gray-600">Activities</p>
					</div>
					<div className="bg-base-100 p-4 rounded-md text-center">
						<p className="text-2xl font-bold text-primary">
							{totalDays > 0 ? Math.round(totalActivities / totalDays) : 0}
						</p>
						<p className="text-gray-600">Avg. Activities per Day</p>
					</div>
				</div>
			</div>

			<h2 className="text-xl font-semibold mb-4">Daily Overview</h2>
			{planDetails.map((day) => (
				<div key={day.id} className="bg-white rounded-lg shadow-md p-6 mb-4">
					<div className="flex justify-between items-center mb-4">
						<div>
							<h3 className="text-lg font-semibold">Day {day.day}</h3>
							<p className="text-gray-500">{format(day.date, 'EEE, MMMM d')}</p>
						</div>
					</div>

					<div className="space-y-3">
						{[
							...(Array.isArray(day.activities) ? day.activities : []),
							...(Array.isArray(day.activitiesFromBanner)
								? day.activitiesFromBanner
								: []),
						]
							.slice(0, 3)
							.map((activity) => {
								const isDestinationActivity = 'destination' in activity;
								return (
									<div key={activity.id} className="flex items-center">
										<div className="bg-gray-200 rounded-full p-2 mr-3">
											<WaypointsIcon />
										</div>
										<div>
											<p className="font-medium">
												{activity.time} -{' '}
												{isDestinationActivity
													? activity.destination.name
													: activity.bannerAds?.title}
											</p>
											<p className="text-sm text-gray-500 truncate">
												{isDestinationActivity
													? activity.destination.description.substring(0, 60)
													: activity.bannerAds?.description?.substring(0, 60)}
												...
											</p>
										</div>
									</div>
								);
							})}
						{(day.activities?.length || 0) +
							(day.activitiesFromBanner?.length || 0) >
							3 && (
							<p
								className="text-primary text-sm hover:cursor-pointer "
								onClick={() => setSelectedDay(day.day)}
							>
								+{' '}
								{(day.activities!.length || 0) +
									(day.activitiesFromBanner?.length || 0) -
									3}{' '}
								more activities
							</p>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
