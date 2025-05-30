import { BannerResponse } from '@/types/banner';
import { CreateBanner, UpdateBanner } from '../validations/banner-schema';
import { prisma } from '../db';
import { ApiError } from '@/utils/apiError';

export class BannerService {
	static async createBanner(
		body: Omit<CreateBanner, 'image'>,
		userId: string
	): Promise<BannerResponse> {
		const endDate = new Date();
		endDate.setDate(endDate.getDate() + parseInt(body.bannerDuration));
		return await prisma.bannerAds.create({
			data: {
				userId: userId,
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

	static async getBannerById(bannerId: string): Promise<BannerResponse> {
		const banner = await prisma.bannerAds.findUnique({
			where: {
				id: bannerId,
			},
		});

		if (!banner) {
			throw new ApiError(404, 'Banner not found');
		}

		return banner;
	}

	static async deleteBanner(bannerId: string): Promise<BannerResponse> {
		await this.getBannerById(bannerId);
		const banner = await prisma.bannerAds.delete({
			where: {
				id: bannerId,
			},
		});

		return banner;
	}

	static async updateBanner(
		body: UpdateBanner,
		bannerId: string
	): Promise<BannerResponse> {
		await this.getBannerById(bannerId);
		const filteredData = Object.fromEntries(
			Object.entries(body).filter(([, v]) => v !== undefined)
		);
		return await prisma.bannerAds.update({
			where: {
				id: bannerId,
			},
			data: filteredData,
		});
	}

	static async acceptBanner(bannerId: string) {
		this.getBannerById(bannerId);
		return await prisma.bannerAds.update({
			where: { id: bannerId },
			data: {
				isActive: true,
			},
		});
	}

	static async getBannerByUserId(
		userId: string,
		query: { page: number; limit: number; sort: string; order: string }
	) {
		const offset = (query.page - 1) * query.limit;
		const [data, total] = await Promise.all([
			prisma.bannerAds.findMany({
				where: { userId },
				skip: offset,
				take: query.limit,
				orderBy: {
					[query.sort]: query.order,
				},
			}),
			prisma.bannerAds.count({
				where: { userId },
			}),
		]);

		return { data, total };
	}
}
