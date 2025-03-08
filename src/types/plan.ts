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
