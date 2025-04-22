export type CreatePlan = {
	name: string;
	startDate: string;
	endDate: string;
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

export type PlanDetailResponse = PlanResponse & {
	planDetails: {
		id: string;
		day: number;
		date: Date;
		planId?: string;
		activities?: Activities[];
	}[];
};

export type Activities = {
	id: string;
	planDetailId?: string;
	destinationId?: string;
	time: string;
	createdAt?: Date;
	updatedAt?: Date;
	destination: Destination;
};

export type Destination = {
	id?: string;
	imageUrl: string | null;
	name: string;
	description: string;
	address: string;
	cost: string;
	createdAt?: Date;
	updatedAt?: Date;
	categoryId?: string;
	category: {
		name: string;
		imageUrl: string | null;
	};
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
	category: string;
	distance: string;
};

export type RequestItinerary = {
	city: string;
	travelCompanion: string;
	budget: number;
	duration: number;
	travelTheme: string;
};

export enum TravelTheme {
	Adventure = 'adventure',
	Romantic = 'romantic',
	Cultural = 'cultural',
	Relaxation = 'relaxation',
	Family = 'family',
	Nature = 'nature',
	City = 'city',
	Beach = 'beach',
	Business = 'business',
	Wellness = 'wellness',
	Culinary = 'culinary',
	Solo = 'solo',
	Luxury = 'luxury',
	RoadTrip = 'road-trip',
	Backpacking = 'backpacking',
	Cruise = 'cruise',
	Festival = 'festival',
	Shopping = 'shopping',
}

export enum TravelCompanion {
	Solo = 'Solo',
	Partner = 'Partner',
	Spouse = 'Spouse',
	Family = 'Family',
	Friends = 'Friends',
	Coworkers = 'Coworkers',
	OnlineFriends = 'OnlineFriends',
	Roommate = 'Roommate',
}
