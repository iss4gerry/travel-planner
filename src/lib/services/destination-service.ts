import { ApiError } from '@/utils/apiError';
import { prisma } from '../db';
import {
	CreateDestination,
	UpdateDestination,
} from '../validations/destination-schema';
import { DestinationResponse } from '@/types/destination';

export class DestinationService {
	static async getAllDestination(): Promise<DestinationResponse[]> {
		return await prisma.destination.findMany();
	}

	static async getDestinationById(destinationId: string) {
		const destination = await prisma.destination.findUnique({
			where: {
				id: destinationId,
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
}
