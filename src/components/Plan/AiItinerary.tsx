import { Itinerary } from '@/types/plan';

export default function AiItinerary({
	aiItineraryRef,
	selectedDay,
	saveItinerary,
	saveItineraryIsPending,
	aiItinerary,
	deleteDestinationFromItinerary,
}: {
	aiItineraryRef: React.RefObject<HTMLDivElement | null>;
	selectedDay: number;
	saveItinerary: () => void;
	saveItineraryIsPending: boolean;
	aiItinerary: Itinerary;
	deleteDestinationFromItinerary: (placeName: string) => void;
}) {
	return (
		<div className="card bg-base-100 shadow-xl mt-8" ref={aiItineraryRef}>
			<div className="card-body">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center">
					<h2 className="card-title text-xl flex items-center">
						<svg
							className="w-6 h-6 mr-2 text-primary"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M13 10V3L4 14h7v7l9-11h-7z"
							/>
						</svg>
						AI Suggested Itinerary - Day {selectedDay}
					</h2>

					<button
						onClick={saveItinerary}
						className={`btn mt-4 md:mt-0 bg-primary text-base-100`}
						disabled={saveItineraryIsPending}
					>
						{saveItineraryIsPending ? 'Saving' : 'Save to plan'}
					</button>
				</div>

				<div className="divider"></div>

				<div className="space-y-6">
					{aiItinerary &&
						aiItinerary[`day${selectedDay}`]?.map((item, index) => (
							<div
								key={index}
								className="card bg-base-200 shadow-sm group hover:shadow-md transition-shadow"
							>
								<div className="card-body relative">
									<button
										className="btn btn-circle btn-xs btn-primary absolute right-2 top-2 opacity-70 group-hover:opacity-100 transition-opacity"
										title="Remove this destination"
										onClick={() =>
											deleteDestinationFromItinerary(item.placeName)
										}
									>
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>

									<div className="flex flex-col md:flex-row md:justify-between md:items-start pr-8">
										<div>
											<h3 className="card-title text-lg">{item.placeName}</h3>
											<p className="text-sm opacity-70">
												{item.time} • {item.category}
											</p>
										</div>
										<div className="mt-2 md:mt-0">
											<div className="badge badge-secondary badge-lg text-primary">
												{item.cost}
											</div>
										</div>
									</div>

									<p className="mt-2">{item.description}</p>

									<div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
										<div className="flex items-center text-sm opacity-70">
											<svg
												className="w-4 h-4 mr-1"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
												/>
											</svg>
											{item.address}
										</div>
										<div className="flex items-center text-sm opacity-70">
											<svg
												className="w-4 h-4 mr-1"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
												/>
											</svg>
											{item.distance}
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
