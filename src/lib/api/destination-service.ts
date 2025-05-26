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
					_count: {
						select: {
							likes: true,
						},
					},
				},
			}),
			prisma.destination.count(),
		]);

		return { data: destinations, total };
	}

	static async getDestinationById(destinationId: string, userId: string) {
		const [destination, totalLikes] = await Promise.all([
			prisma.destination.findUnique({
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
			}),

			this.getLikes(destinationId, userId),
		]);

		if (!destination) {
			throw new ApiError(404, 'Destination not found');
		}

		return { destination, totalLikes };
	}

	static async createDestination(
		body: CreateDestination,
		userId: string
	): Promise<DestinationService> {
		return await prisma.destination.create({
			data: { ...body, userId: userId },
		});
	}

	static async updateDestination(
		body: UpdateDestination,
		destinationId: string
	): Promise<DestinationResponse> {
		const destination = await prisma.destination.findFirst({
			where: {
				id: destinationId,
			},
		});

		if (!destination) {
			throw new ApiError(404, 'Destination not found');
		}
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
		const destination = await prisma.destination.findFirst({
			where: {
				id: destinationId,
			},
		});

		if (!destination) {
			throw new ApiError(404, 'Destination not found');
		}

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

	static async getDestinationByUserId(
		userId: string,
		query: { page: number; limit: number; sort: string; order: string }
	) {
		const offset = (query.page - 1) * query.limit;
		const [data, total] = await Promise.all([
			prisma.destination.findMany({
				where: { userId },
				skip: offset,
				take: query.limit,
				orderBy: {
					[query.sort]: query.order,
				},
			}),

			prisma.destination.count({
				where: { userId },
			}),
		]);

		return { data, total };
	}

	static async likeDestination(destinationId: string, userId: string) {
		const existing = await prisma.like.findFirst({
			where: { destinationId, userId },
		});

		if (existing) {
			throw new ApiError(409, 'User has already liked this destination');
		}

		return await prisma.like.create({
			data: {
				destinationId: destinationId,
				userId: userId,
			},
		});
	}

	static async getLikes(destinationId: string, userId: string) {
		const [totalLikes, hasUserLiked] = await Promise.all([
			prisma.like.count({
				where: {
					destinationId: destinationId,
				},
			}),

			prisma.like.findFirst({
				where: {
					destinationId: destinationId,
					userId: userId,
				},
			}),
		]);

		return {
			totalLikes,
			hasUserLiked: !!hasUserLiked,
		};
	}

	static async deleteLike(destinationId: string, userId: string) {
		return await prisma.like.deleteMany({
			where: {
				destinationId,
				userId,
			},
		});
	}
}
