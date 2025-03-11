import { prisma } from '../db';
import { CreateDestination } from '../validations/destination-schema';

export class DestinationService {
	static async createDestination(
		body: CreateDestination
	): Promise<DestinationService> {
		return await prisma.destination.create({
			data: body,
		});
	}
}
