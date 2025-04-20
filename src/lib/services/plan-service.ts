import { CreatePlan, PlanResponse } from '@/types/plan';
import {
	getAxiosInstance,
	getAxiosWithCookie,
	handleAxiosError,
} from '../axios';

export const fetchPlanServer = async (cookieStore: string) => {
	try {
		const axios = getAxiosWithCookie(cookieStore);
		const { data } = await axios.get('/plans');
		const plans: PlanResponse[] = data.data;
		return plans;
	} catch (error) {
		handleAxiosError(error, 'fetchPlan');
	}
};

export const fetchPlan = async () => {
	try {
		const axios = getAxiosInstance();
		const { data } = await axios.get('/plans');

		const plans: PlanResponse[] = data.data;
		return plans;
	} catch (error) {
		handleAxiosError(error, 'fetchPlan');
	}
};

export const createPlan = async (body: CreatePlan) => {
	try {
		const axios = getAxiosInstance();
		const { data } = await axios.post('/plans', {
			...body,
		});

		const plans: PlanResponse = data.data;
		return plans;
	} catch (error) {
		handleAxiosError(error, 'fetchPlan');
	}
};
