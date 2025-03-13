export type BannerResponse = {
	id: string;
	userId: string;
	imageUrl: string;
	title: string;
	description: string;
	startDate: string;
	address: string;
	cost: number;
	categoryId: string;
	targetUrl: string;
	bannerDuration: number;
	validUntil: Date;
	isActive: boolean;
	isPaid: boolean;
	createdAt: Date;
	updatedAt: Date;
};
