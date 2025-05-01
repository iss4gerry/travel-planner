import { useState } from 'react';
import type { BannerAds, Destination, PlanDetailResponse } from '@/types/plan';
import { format } from 'date-fns';
import { MapPin, Clock, ChevronRight, Info } from 'lucide-react';
import { getThemeHexColor } from '@/utils/planThemeColor';
import Image from 'next/image';

export default function DayView({
	dayDetail,
}: {
	dayDetail: PlanDetailResponse['planDetails'][number];
}) {
	const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

	if (!dayDetail) {
		return (
			<div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center h-64">
				<div className="text-center text-gray-500">
					<Info className="w-12 h-12 mx-auto mb-2 text-gray-400" />
					<p className="text-lg font-medium">No day details available</p>
					<p className="text-sm mt-2">
						Please select a different day or check back later
					</p>
				</div>
			</div>
		);
	}

	const activities = dayDetail.activities || [];
	const activitiesFromBanner = dayDetail.activitiesFromBanner || [];

	const allActivities = [...activities, ...activitiesFromBanner];
	const mergedActivities = [...(allActivities || [])].sort((a, b) => {
		const to24Hour = (time: string) => {
			const [hourMinute, modifier] = time.split(' ');
			let [hours, minutes] = hourMinute.split(':').map(Number);
			if (modifier === 'PM' && hours !== 12) {
				hours += 12;
			} else if (modifier === 'AM' && hours === 12) {
				hours = 0;
			}

			return hours * 60 + minutes;
		};

		return to24Hour(a.time) - to24Hour(b.time);
	});

	const toggleActivity = (id: string) => {
		if (expandedActivity === id) {
			setExpandedActivity(null);
		} else {
			setExpandedActivity(id);
		}
	};

	return (
		<div className="bg-base-100 rounded-lg shadow-lg overflow-hidden">
			<div className="bg-primary text-white p-6">
				<div className="flex justify-between items-center">
					<div>
						<h2 className="text-2xl font-bold">Day {dayDetail.day}</h2>
						<p className="text-indigo-100 mt-1">
							{format(new Date(dayDetail.date), 'EEEE, MMMM d, yyyy')}
						</p>
					</div>
					<div className="bg-secondary rounded-full px-4 py-2 text-sm font-medium">
						{mergedActivities.length} Activities
					</div>
				</div>
			</div>

			<div className="p-6">
				<div className="relative">
					<div className="space-y-6">
						{mergedActivities.length === 0 ? (
							<div className="text-center py-8 text-gray-500">
								<Clock className="w-12 h-12 mx-auto mb-2 text-gray-400" />
								<p>No activities scheduled for this day</p>
							</div>
						) : (
							mergedActivities.map((activity) => {
								const isExpanded = expandedActivity === activity.id;
								const isDestination = 'destination' in activity;
								const data = isDestination
									? activity.destination
									: activity.bannerAds;

								return (
									<div key={activity.id}>
										<div className="flex">
											<div className="absolute left-31 top-2 bottom-0 w-0.5 bg-gray-200"></div>
											<div className="flex flex-row w-[13vh] justify-between ">
												<div className="min-w-20 pr-4 text-right">
													<span className="font-medium text-gray-700">
														{activity.time}
													</span>
												</div>
												<div className="relative">
													<div className="absolute left-0 bg-primary border-4 border-indigo-100 rounded-full w-5 h-5 z-10"></div>
												</div>
											</div>

											<div className="flex-1 ml-6">
												<div
													className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 ${
														isExpanded ? 'shadow-lg' : 'hover:shadow-md'
													}`}
													onClick={() => toggleActivity(activity.id)}
												>
													<div className="p-4 cursor-pointer bg-gray-50 flex items-center justify-between">
														<div className="flex items-center space-x-3">
															<div
																className="w-10 h-10 rounded-full flex items-center justify-center text-white"
																style={{
																	backgroundColor: getThemeHexColor(
																		data.category.name
																	),
																}}
															>
																{getCategoryIcon(data.category.name)}
															</div>
															<div>
																<h3 className="font-semibold text-lg text-gray-800">
																	{(data as Destination).name ??
																		(data as BannerAds).title}
																</h3>
																<p className="text-sm text-gray-500">
																	{data.category.name} • {data.cost}
																</p>
															</div>
														</div>
														<ChevronRight
															className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
																isExpanded ? 'transform rotate-90' : ''
															}`}
														/>
													</div>

													{isExpanded && (
														<div className="divide-y divide-gray-100">
															<div className="p-4">
																<div className="flex flex-col md:flex-row">
																	{data.imageUrl && (
																		<Image
																			src={
																				data.imageUrl ||
																				data.category.imageUrl ||
																				'/api/placeholder/200/150'
																			}
																			width={20}
																			height={48}
																			alt={
																				(data as Destination).name ??
																				(data as BannerAds).title
																			}
																			className="w-full md:w-1/3 h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
																		/>
																	)}
																	<div
																		className={
																			data.imageUrl ? 'md:w-2/3' : 'w-full'
																		}
																	>
																		<p className="text-gray-700">
																			{data.description}
																		</p>
																	</div>
																</div>
															</div>

															{data.address && (
																<div className="bg-gray-50 p-4">
																	<div className="flex items-center text-gray-600">
																		<MapPin className="w-4 h-4 flex-shrink-0 text-indigo-500" />
																		<span className="ml-2 text-sm">
																			{data.address}
																		</span>
																	</div>
																</div>
															)}
														</div>
													)}
												</div>
											</div>
										</div>
									</div>
								);
							})
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

function getCategoryIcon(category: string) {
	return category.charAt(0).toUpperCase();
}
