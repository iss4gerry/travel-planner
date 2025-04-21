import { PlanDetailResponse } from '@/types/plan';
import { format } from 'date-fns';
import { LocateIcon, MapPin, Pointer } from 'lucide-react';

export default function DayView({
	dayDetail,
}: {
	dayDetail: PlanDetailResponse['planDetails'][number];
}) {
	if (!dayDetail) {
		return (
			<div className="bg-white rounded-lg shadow-md p-6">
				No day details available
			</div>
		);
	}
	const sortedActivities = [...(dayDetail.activities || [])].sort((a, b) => {
		const timeA = a.time.split(':').map(Number);
		const timeB = b.time.split(':').map(Number);
		return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
	});

	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<h2 className="text-xl font-semibold mb-2">Day {dayDetail.day}</h2>
			<p className="text-gray-500 mb-6">
				{format(new Date(dayDetail.date), 'EEE, MMMM d')}
			</p>

			<div className="relative">
				<div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

				<div className="space-y-8">
					{sortedActivities.map((activity, index) => (
						<div key={activity.id} className="flex">
							<div className="min-w-16 pr-4 text-right">
								<span className="font-medium text-gray-700">
									{activity.time}
								</span>
							</div>

							<div className="relative z-10">
								<div className="bg-indigo-500 rounded-full w-4 h-4 mt-1"></div>
							</div>

							<div className="flex-1 ml-6">
								<div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
									<div className="flex items-start justify-between">
										<div>
											<h3 className="font-semibold text-lg">
												{activity.destination.name}
											</h3>
											<p className="text-sm text-gray-500 mb-2">
												{activity.destination.category.name} •{' '}
												{activity.destination.cost}
											</p>
										</div>
										{activity.destination.imageUrl && (
											<img
												src={activity.destination.imageUrl}
												alt={activity.destination.name}
												className="w-20 h-20 object-cover rounded"
											/>
										)}
									</div>

									<p className="text-gray-700 mb-3">
										{activity.destination.description}
									</p>

									<div className="flex items-center text-gray-500 text-sm">
										<MapPin width={20} />
										<span className="ml-2">{activity.destination.address}</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
