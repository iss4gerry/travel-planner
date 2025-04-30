export type ActivityResponse = {
	id: string;
	planDetailId: string;
	destinationId: string;
	time: string;
	createdAt: Date;
	updatedAt: Date;
};

export type ActivityFromBanner = {
	id: string;
	planDetailId: string;
	bannerId: string;
	time: string;
	createdAt: Date;
	updatedAt: Date;
};
