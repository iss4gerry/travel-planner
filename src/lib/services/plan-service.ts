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
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

// const itinerary: { result: Itinerary } = {
// 	result: {
// 		day1: [
// 			{
// 				placeName: 'Warung Sopa',
// 				description: 'Breakfast',
// 				time: '7:00 - 8:00 AM',
// 				cost: 'Rp. 200,000',
// 				category: 'culinary',
// 				address:
// 					'Jl. Pantai Batu Bolong No.99, Canggu, Kuta Utara, Kabupaten Badung, Bali 80361',
// 				distance: '0Km',
// 			},
// 			{
// 				placeName: 'Tanah Lot Temple',
// 				description: 'Explore the iconic sea temple',
// 				time: '8:30 AM - 12:00 PM',
// 				cost: 'Rp. 60,000 (entrance fee)',
// 				category: 'nature',
// 				address:
// 					'Jalan Raya Tanah Lot, Desa Beraban, Kec. Kediri, Kabupaten Tabanan, Bali 82111',
// 				distance: '18km',
// 			},
// 			{
// 				placeName: 'Canteen near Tanah Lot',
// 				description: 'Lunch',
// 				time: '12:00 PM - 1:00 PM',
// 				cost: 'Rp. 150,000',
// 				category: 'culinary',
// 				address: 'near Tanah Lot Temple',
// 				distance: '0.5km',
// 			},
// 			{
// 				placeName: 'Uluwatu Temple',
// 				description:
// 					'Witness Kecak dance performance (optional, check showtimes)',
// 				time: '2:00 PM - 6:00 PM',
// 				cost: 'Rp. 100,000 (entrance fee)',
// 				category: 'nature',
// 				address:
// 					'Jl. Raya Uluwatu, Pecatu, Kec. Kuta Sel., Kabupaten Badung, Bali 80361',
// 				distance: '20km',
// 			},
// 			{
// 				placeName: 'Jimbaran Bay',
// 				description: 'Dinner by the beach',
// 				time: '7:00 PM - 9:00 PM',
// 				cost: 'Rp. 300,000',
// 				category: 'culinary',
// 				address: 'Jimbaran, South Kuta, Badung Regency, Bali',
// 				distance: '15km',
// 			},
// 		],
// 		day2: [
// 			{
// 				placeName: "Made's Warung",
// 				description: 'Breakfast',
// 				time: '7:00 - 8:00 AM',
// 				cost: 'Rp. 150,000',
// 				category: 'culinary',
// 				address:
// 					'Jl. Pantai Batu Bolong No.5, Canggu, Kuta Utara, Kabupaten Badung, Bali 80361',
// 				distance: '0km',
// 			},
// 			{
// 				placeName: 'Ubud Monkey Forest',
// 				description: 'Interact with playful monkeys',
// 				time: '9:00 AM - 12:00 PM',
// 				cost: 'Rp. 60,000 (entrance fee)',
// 				category: 'nature',
// 				address: 'Jl. Monkey Forest, Ubud, Gianyar, Bali 80571',
// 				distance: '35km',
// 			},
// 			{
// 				placeName: 'Local Warung in Ubud',
// 				description: 'Lunch',
// 				time: '12:00 PM - 1:00 PM',
// 				cost: 'Rp. 100,000',
// 				category: 'culinary',
// 				address: 'Near Ubud Monkey Forest',
// 				distance: '0.5km',
// 			},
// 			{
// 				placeName: 'Tegalalang Rice Terraces',
// 				description: 'Stunning rice paddy views',
// 				time: '1:30 PM - 4:30 PM',
// 				cost: 'Rp. 15,000 (entrance fee)',
// 				category: 'nature',
// 				address: 'Tegalalang, Gianyar, Bali',
// 				distance: '10km',
// 			},
// 			{
// 				placeName: 'Locavore',
// 				description: 'Fine dining experience',
// 				time: '7:00 PM - 9:00 PM',
// 				cost: 'Rp. 500,000',
// 				category: 'culinary',
// 				address: 'Jl. Dewisita No.9, Ubud, Gianyar, Bali 80571',
// 				distance: '8km',
// 			},
// 		],
// 	},
// };

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

		let data = await this.groqRequest(requestData);
		if (!data) {
			console.log('groq');
			data = await this.geminiRequest(requestData);
			if (!data) {
				throw new ApiError(500, 'An error occured while generate itinerary');
			}
		}

		return data;
	}

	static async geminiRequest(
		itineraryData: RequestItinerary
	): Promise<Itinerary | null> {
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

			const response: { result: Itinerary } = JSON.parse(data);

			return response.result;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	static async groqRequest(
		itineraryData: RequestItinerary
	): Promise<Itinerary | null> {
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
			if (text.includes('json```') || text.includes('```')) {
				data = text.replace(/json|```/g, '');
			}

			const response: { result: Itinerary } = JSON.parse(data);

			return response.result;
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
        - The destination must suitable for ${itineraryData.travelCompanion}
        - Start with breakfast and end with dinner.
        - The activities should be reasonable for each day, ensuring no overlapping or conflicting schedules. For example, do not combine a beach visit and a water park visit on the same day.
        - The order of places should be logical, such as: on the first day, visit place A, then move to place B, and have a meal at place C.
        - The destinations address within a single day should be relatively close to each other and not more than 20km to mode from one place to another and also should be visitable from morning to night, not run out of time on the way.
        
        Your response must **ONLY** contain the object.  
        Do not include any introductory text, explanations, or additional formatting.  
        Send the response in the following string format. Your entire response/output should consist of a single string object {}. Your response must begin with { and end with } 
        and you will NOT wrap it within JSON markdown markers.
      
        {
          "result": {
            "day1": [
              {
                "placeName": "string",  // The actual name of the place,
                "description": "string",  // Activities or experiences at this location,
                "time": "string", // time doing this activity,
                "cost": "string", // in rupiah ex (Rp. xxxx)
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
}
