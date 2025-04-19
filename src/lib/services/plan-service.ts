import { PlanResponse } from '@/types/plan';

export const fetchPlanServer = async (cookieStore: string) => {
	try {
		const result = await fetch('http://localhost:3002/api/plans', {
			headers: {
				cookie: cookieStore,
			},
		});

		const response: { data: PlanResponse[] } = await result.json();
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const fetchPlan = async () => {
	try {
		const result = await fetch('http://localhost:3002/api/plans');

		const response: { data: PlanResponse[] } = await result.json();
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
