import { CreatePlan, PlanDetailResponse, PlanResponse } from '@/types/plan';
import {
	getAxiosInstance,
	getAxiosWithCookie,
	handleAxiosError,
} from '../axios';

export const fetchPlanServer = async (
	cookieStore: string,
	params: {
		page: number;
		limit: number;
		sort: string;
		order: string;
	}
) => {
	try {
		const axios = getAxiosWithCookie(cookieStore);
		const { data } = await axios.get('/plans', {
			params: {
				...params,
			},
		});
		const plans: PlanResponse[] = data.data;
		const pagination: {
			page: number;
			limit: number;
			total: number;
			totalPages: number;
		} = data.pagination;
		return { plans, pagination };
	} catch (error) {
		handleAxiosError(error, 'fetchPlanServer');
	}
};

export const fetchPlan = async (params: {
	page: number;
	limit: number;
	sort: string;
	order: string;
}) => {
	try {
		const axios = getAxiosInstance();
		const { data } = await axios.get('/plans', {
			params: {
				...params,
			},
		});

		const plans: PlanResponse[] = data.data;
		const pagination: {
			page: number;
			limit: number;
			total: number;
			totalPages: number;
		} = data.pagination;
		return { plans, pagination };
	} catch (error) {
		handleAxiosError(error, 'fetchPlan');
	}
};

export const fetchPlanById = async (cookieStore: string, id: string) => {
	try {
		const axios = getAxiosWithCookie(cookieStore);
		const { data } = await axios.get(`/plans/${id}`);
		const plan: PlanDetailResponse = data.data;

		return plan;
	} catch (error) {
		handleAxiosError(error, 'fetchPlan');
	}
};

export const fetchPlanByIdClient = async (id: string) => {
	try {
		const axios = getAxiosInstance();
		const { data } = await axios.get(`/plans/${id}`);
		const plan: PlanDetailResponse = data.data;

		return plan;
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
