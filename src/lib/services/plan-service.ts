import { CreatePlan, PlanResponse } from '@/types/plan';
import {
	axiosWithCookie,
	axiosWithoutCookie,
	handleAxiosError,
} from '../axios';

export const fetchPlanServer = async (cookieStore: string) => {
	try {
		const axios = await axiosWithCookie(cookieStore);
		const { data } = await axios.get('/plans');
		const plans: PlanResponse[] = data.data;
		return plans;
	} catch (error) {
		handleAxiosError(error, 'fetchPlan');
	}
};

export const fetchPlan = async () => {
	try {
		const axios = await axiosWithoutCookie();
		const { data } = await axios.get('/plans');

		const plans: PlanResponse[] = data.data;
		return plans;
	} catch (error) {
		handleAxiosError(error, 'fetchPlan');
	}
};

export const createPlan = async (body: CreatePlan) => {
	try {
		const axios = await axiosWithoutCookie();
		const { data } = await axios.post('/plans', {
			...body,
		});

		const plans: PlanResponse = data.data;
		return plans;
	} catch (error) {
		handleAxiosError(error, 'fetchPlan');
	}
};
