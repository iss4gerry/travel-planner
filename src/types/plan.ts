import { Plan } from '@prisma/client';
import { Category } from './category';

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
