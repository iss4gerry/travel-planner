import { BannerResponse } from '@/types/banner';
import { CreateBanner } from '../validations/banner-schema';
import { prisma } from '../db';

export class BannerService {
	static async createBanner(
		body: Omit<CreateBanner, 'image'>,
		userId: string
	): Promise<BannerResponse> {
		const url =
			'https://static.vecteezy.com/system/resources/previews/011/079/246/non_2x/example-button-speech-bubble-example-colorful-web-banner-illustration-vector.jpg';
		const endDate = new Date();
		endDate.setDate(endDate.getDate() + parseInt(body.bannerDuration));
		return await prisma.bannerAds.create({
			data: {
				userId: userId,
				imageUrl: url,
				validUntil: endDate,
				...body,
				cost: parseFloat(body.cost as string),
				bannerDuration: parseInt(body.bannerDuration),
			},
		});
	}

	static async getAllBanner(): Promise<BannerResponse[]> {
		return await prisma.bannerAds.findMany();
	}
}
