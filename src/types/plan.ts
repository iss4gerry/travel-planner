export type CreatePlan = {
	name: string;
	startDate: Date;
	endDate: Date;
	city: string;
	travelCompanion: string;
	budget: number;
	travelTheme: string;
};

export type PlanResponse = {
	id: string;
	name: string;
	startDate: Date;
	endDate: Date;
	city: string;
	travelCompanion: string;
	budget: number;
	travelTheme: string;
	createdAt: Date;
	updatedAt: Date;
};

export type Itinerary = {
	[key: `day${number}`]: ItineraryData[];
};

export type ItineraryData = {
	placeName: string;
	description: string;
	time: string;
	address: string;
	cost: string;
	distance: string;
};

export type RequestItinerary = {
	city: string;
	travelCompanion: string;
	budget: number;
	duration: number;
	travelTheme: string;
};
