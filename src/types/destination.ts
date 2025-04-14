export type DestinationResponse = {
	id: string;
	imageUrl: string | null;
	name: string;
	description: string;
	address: string;
	city: string | null;
	cost: string;
	createdAt: Date;
	updatedAt: Date;
	categoryId: string;
	category?: {
		name: string;
		imageUrl: string | null;
	};
};
