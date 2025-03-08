import { CreatePlan, PlanResponse } from '@/types/plan';
import { prisma } from '../db';
import { ApiError } from '@/utils/apiError';

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
				.map((theme) => theme.charAt(0).toUpperCase() + theme.slice(1))
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

	static async getPlanById(planId: string): Promise<PlanResponse> {
		const plan = await prisma.plan.findUnique({
			where: {
				id: planId,
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
}
