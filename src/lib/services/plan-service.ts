import {
	CreatePlan,
	Itinerary,
	ItineraryData,
	PlanDetailResponse,
	PlanResponse,
	RequestItinerary,
} from '@/types/plan';
import { prisma } from '../db';
import { ApiError } from '@/utils/apiError';
import { ActivityResponse } from '@/types/activity';
import { AddDestinationToPlan } from '../validations/plan-schema';
import { ItineraryService } from './itinerary-service';

export class PlanService {
	static async createPlan(
		body: CreatePlan,
		userId: string
	): Promise<PlanResponse> {
		body.startDate = new Date(body.startDate);
		body.endDate = new Date(body.endDate);
		body.budget = Number(body.budget);
		const user = await prisma.user.findFirst({
			where: {
				id: userId,
			},
		});

		if (!user) {
			throw new ApiError(404, 'User not found');
		}

		if (body.travelTheme) {
			body.travelTheme = body.travelTheme
				.split(/\s*\/\s*|\s+/)
				.map((theme) => theme.charAt(0).toLowerCase() + theme.slice(1))
				.join('/');
		}

		let days = 0;
		if (body.endDate >= body.startDate) {
			days =
				Math.ceil(
					(body.endDate.getTime() - body.startDate.getTime()) /
						(1000 * 60 * 60 * 24)
				) + 1;
		} else {
			throw new ApiError(400, 'Invalid date range');
		}

		const plan = await prisma.plan.create({
			data: {
				userId: userId,
				...body,
			},
		});

		const planDetail = Array.from({ length: days }, (_, index) => ({
			day: index + 1,
			date: new Date(
				new Date(body.startDate).setDate(body.startDate.getDate() + index)
			),
			planId: plan.id,
		}));

		await prisma.planDetail.createMany({
			data: planDetail,
		});

		return plan;
	}

	static async getAllPlan(userId: string): Promise<PlanResponse[]> {
		return await prisma.plan.findMany({
			where: {
				userId: userId,
			},
		});
	}

	static async getPlanById(planId: string): Promise<PlanDetailResponse> {
		const plan = await prisma.plan.findUnique({
			where: {
				id: planId,
			},
			include: {
				planDetails: true,
			},
		});

		if (!plan) {
			throw new ApiError(404, 'Plan not found');
		}

		return plan;
	}

	static async getPlanDetail(planId: string): Promise<PlanDetailResponse> {
		const plan = await prisma.plan.findFirst({
			where: {
				id: planId,
			},
			select: {
				id: true,
				name: true,
				startDate: true,
				endDate: true,
				city: true,
				travelCompanion: true,
				budget: true,
				travelTheme: true,
				createdAt: true,
				updatedAt: true,
				planDetails: {
					select: {
						id: true,
						day: true,
						date: true,
						activities: {
							select: {
								id: true,
								time: true,
								destination: {
									select: {
										name: true,
										imageUrl: true,
										description: true,
										address: true,
										cost: true,
										category: {
											select: {
												name: true,
												imageUrl: true,
											},
										},
									},
								},
							},
						},
					},
				},
			},
		});

		if (!plan) {
			throw new ApiError(404, 'Plan not found');
		}

		return plan;
	}

	static async deletePlan(planId: string): Promise<PlanResponse> {
		await this.getPlanById(planId);
		return await prisma.plan.delete({
			where: {
				id: planId,
			},
		});
	}

	static async updatePlan(
		body: CreatePlan,
		planId: string
	): Promise<PlanResponse> {
		await this.getPlanById(planId);
		return await prisma.plan.update({
			where: {
				id: planId,
			},
			data: body,
		});
	}

	static async getItinerary(planId: string): Promise<Itinerary> {
		const planData = await prisma.plan.findFirst({
			where: {
				id: planId,
			},
			include: {
				planDetails: true,
			},
		});

		if (!planData) {
			throw new ApiError(404, 'Plan not found');
		}

		const requestData: RequestItinerary = {
			city: planData.city,
			travelCompanion: planData.travelCompanion,
			budget: planData.budget,
			duration: planData.planDetails.length,
			travelTheme: planData.travelTheme,
		};

		let data = await ItineraryService.geminiRequest(requestData);
		if (!data) {
			console.log('groq');
			data = await ItineraryService.groqRequest(requestData);
			if (!data) {
				throw new ApiError(500, 'An error occured while generate itinerary');
			}
		}

		return data;
	}

	static async saveItinerary(
		body: { result: Itinerary } | undefined,
		planId: string
	): Promise<Itinerary | undefined> {
		const plan = await this.getPlanById(planId);
		const categoryNames = [
			...new Set(
				Object.values(body!.result)
					.flatMap((itineraryDataArray) => itineraryDataArray)
					.map((itineraryData) => itineraryData.category.toLowerCase())
			),
		];

		const categories = await prisma.category.findMany({
			where: { name: { in: categoryNames } },
		});

		const travelDays = plan.planDetails;
		const categoriesMap = Object.fromEntries(
			categories.map((c) => [c.name, c.id])
		);
		const travelDayMap = Object.fromEntries(
			travelDays.map((d) => [d.day, d.id])
		);

		type RemapItineraryData = Omit<
			ItineraryData,
			'category' | 'distance' | 'placeName' | 'time'
		> & {
			name: string;
		};

		const destinations: (RemapItineraryData & {
			id: string;
			categoryId: string;
		})[] = [];

		const activities: {
			planDetailId: string;
			destinationId: string;
			time: string;
		}[] = [];

		Object.entries(body!.result).forEach(([key, destinationsList]) => {
			const dayNumber = parseInt(key.replace('day', ''), 10);
			const planDetailId = travelDayMap[dayNumber];
			destinationsList.forEach(
				({ placeName, description, address, category, cost, time }) => {
					if (!categoriesMap[category]) {
						return;
					}
					const destinationId = `temp-${placeName}`;
					destinations.push({
						id: destinationId,
						name: placeName,
						description: description,
						address: address,
						categoryId: categoriesMap[category],
						cost: cost,
					});

					activities.push({
						planDetailId,
						destinationId,
						time,
					});
				}
			);
		});

		await prisma.destination.createMany({
			data: destinations.map(({ id, ...d }) => d),
		});

		const newDestination = await prisma.destination.findMany({
			where: {
				name: { in: destinations.map((d) => d.name) },
			},
		});

		const destinationMap = Object.fromEntries(
			newDestination.map((d) => [d.name, d.id])
		);

		const finalActivities = activities.map((a) => ({
			...a,
			destinationId: destinationMap[a.destinationId.replace('temp-', '')],
		}));

		await prisma.activity.createMany({
			data: finalActivities,
		});

		return body?.result;
	}

	static async addDestinationToPlan(
		body: AddDestinationToPlan
	): Promise<ActivityResponse> {
		return await prisma.activity.create({
			data: body,
		});
	}

	static async deleteDestinationFromPlan(
		activityId: string
	): Promise<ActivityResponse> {
		return await prisma.activity.delete({
			where: {
				id: activityId,
			},
		});
	}
}
