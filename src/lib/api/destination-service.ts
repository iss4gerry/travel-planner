import { ApiError } from '@/utils/apiError';
import { prisma } from '../db';
import {
	CreateDestination,
	UpdateDestination,
} from '../validations/destination-schema';
import { DestinationResponse } from '@/types/destination';
import { BannerResponse } from '@/types/banner';

export class DestinationService {
	static async getAllDestination(query: {
		page: number;
		limit: number;
		sort: string;
		order: string;
	}): Promise<{
		data: DestinationResponse[];
		total: number;
	}> {
		const offset = (query.page - 1) * query.limit;
		const [destinations, total] = await Promise.all([
			prisma.destination.findMany({
				skip: offset,
				take: query.limit,
				orderBy: {
					[query.sort]: query.order,
				},
				include: {
					category: {
						select: {
							name: true,
							imageUrl: true,
						},
					},
				},
			}),
			prisma.destination.count(),
		]);

		return { data: destinations, total };
	}

	static async getDestinationById(destinationId: string) {
		const destination = await prisma.destination.findUnique({
			where: {
				id: destinationId,
			},
			include: {
				category: {
					select: {
						name: true,
						imageUrl: true,
					},
				},
			},
		});

		if (!destination) {
			throw new ApiError(404, 'Destination not found');
		}

		return destination;
	}

	static async createDestination(
		body: CreateDestination
	): Promise<DestinationService> {
		return await prisma.destination.create({
			data: body,
		});
	}

	static async updateDestination(
		body: UpdateDestination,
		destinationId: string
	): Promise<DestinationResponse> {
		await this.getDestinationById(destinationId);
		return await prisma.destination.update({
			where: {
				id: destinationId,
			},
			data: body,
		});
	}

	static async deleteDestination(
		destinationId: string
	): Promise<DestinationResponse> {
		await this.getDestinationById(destinationId);

		return await prisma.destination.delete({
			where: {
				id: destinationId,
			},
		});
	}

	static async createBannerForDestination(
		bannerDuration: number,
		destinationId: string,
		userId: string
	): Promise<BannerResponse> {
		const destination = await prisma.destination.findFirst({
			where: {
				id: destinationId,
			},
			select: {
				id: true,
				imageUrl: true,
				name: true,
				description: true,
				address: true,
				cost: true,
				categoryId: true,
			},
		});

		if (!destination) {
			throw new ApiError(404, 'Destination not found');
		}

		const endDate = new Date();
		endDate.setDate(endDate.getDate() + bannerDuration);

		return await prisma.bannerAds.create({
			data: {
				...destination,
				imageUrl: destination.imageUrl || 'No image',
				userId: userId,
				title: destination.name,
				startDate: '',
				cost: parseInt(destination.cost),
				targetUrl: `${process.env.FE_URL}/destination/${destination.id}`,
				bannerDuration: bannerDuration,
				validUntil: endDate,
			},
		});
	}
}
