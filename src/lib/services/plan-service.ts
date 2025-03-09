import {
	CreatePlan,
	Itinerary,
	PlanResponse,
	RequestItinerary,
} from '@/types/plan';
import { prisma } from '../db';
import { ApiError } from '@/utils/apiError';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

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

	static async getItinerary(planId: string): Promise<Itinerary[]> {
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

		let data = await this.groqRequest(requestData);
		if (!data) {
			console.log('gemini');
			data = await this.geminiRequest(requestData);
			if (!data) {
				throw new ApiError(500, 'An error occured while generate itinerary');
			}
		}

		return data;
	}

	static async geminiRequest(
		itineraryData: RequestItinerary
	): Promise<Itinerary[] | null> {
		try {
			const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
			const model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });
			const prompt = this.generateItineraryPrompt(itineraryData);

			const result = await model.generateContent(prompt);
			const text = result.response.text();
			let data = text;
			if (text.includes('json```') || text.includes('```')) {
				data = text.replace(/json|```/g, '');
			}

			const response: Itinerary[] = JSON.parse(data);

			return response;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	static async groqRequest(
		itineraryData: RequestItinerary
	): Promise<Itinerary[] | null> {
		try {
			const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
			const prompt = this.generateItineraryPrompt(itineraryData);

			const result = await groq.chat.completions.create({
				messages: [
					{
						role: 'user',
						content: prompt,
					},
				],
				model: 'llama3-8b-8192',
			});

			const text = result.choices[0]?.message?.content || '';
			let data = text;
			console.log(data);
			if (text.includes('json```') || text.includes('```')) {
				data = text.replace(/json|```/g, '');
			}

			const response: Itinerary[] = JSON.parse(data);
			return response;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	static generateItineraryPrompt(itineraryData: RequestItinerary) {
		return `
        Provide me with an itinerary destination for a trip to ${itineraryData.city} with my ${itineraryData.travelCompanion}. 
        With a budget of ${itineraryData.budget}, create a well-structured itinerary for ${itineraryData.duration} days. 
        Suggest destinations from each category: ${itineraryData.travelTheme}/culinary.
        
        Each day's itinerary should:
        - Start with breakfast and end with dinner.
        - The activities should be reasonable for each day, ensuring no overlapping or conflicting schedules. For example, do not combine a beach visit and a water park visit on the same day.
        - The order of places should be logical, such as: on the first day, visit place A, then move to place B, and have a meal at place C.
        - The destinations address within a single day should be relatively close to each other and not more than 20km to mode from one place to another and also should be visitable from morning to night, not run out of time on the way.
      
        Send the response in the following string format. Your entire response/output should consist of a single string object {}, 
        and you will NOT wrap it within JSON markdown markers.
      
        {
          "result": {
            "day1": [
              {
                "place_name": "string",  // The actual name of the place,
                "description": "string",  // Activities or experiences at this location,
                "time": "string", // time doing this activity,
                "cost": "string", // in rupiah
                "category": "${itineraryData.travelTheme}/culinary <- one of those don't write more than one",
                "address": "place address",
                "distance": "distance from previous place if this place are first destination just fill it with 0Km"
              }
            ],
            and so on until day ${itineraryData.duration}
          }
        }
      
        Send the response in English.
        Do not add any additional explanation or text outside the requested format.
        `;
	}
}
