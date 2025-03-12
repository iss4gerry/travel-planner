import { Itinerary, RequestItinerary } from '@/types/plan';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

export class ItineraryService {
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
}
