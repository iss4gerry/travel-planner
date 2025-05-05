import {
	getAxiosInstance,
	getAxiosWithCookie,
	handleAxiosError,
} from '../axios';
import { DestinationResponse } from '@/types/destination';
import { PlanResponse } from '@/types/plan';

export const fetchDestinationServer = async (
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
		const { data } = await axios.get('/destinations', {
			params: { ...params },
		});
		const destinations: DestinationResponse[] = data.data;
		const pagination: {
			page: number;
			limit: number;
			total: number;
			totalPages: number;
		} = data.pagination;

		return { destinations, pagination };
	} catch (error) {
		handleAxiosError(error, 'fetchDestination');
	}
};

export const fetchDestination = async (params: {
	page: number;
	limit: number;
	sort: string;
	order: string;
}) => {
	try {
		const axios = getAxiosInstance();
		const { data } = await axios.get('/destinations', {
			params: { ...params },
		});

		const destinations: DestinationResponse[] = data.data;
		const pagination: {
			page: number;
			limit: number;
			total: number;
			totalPages: number;
		} = data.pagination;
		return { destinations, pagination };
	} catch (error) {
		handleAxiosError(error, 'fetchDestination');
	}
};

export const addDestinationToPlan = async (body: {
	planDetailId: string;
	destinationId?: string;
	time: string;
}) => {
	try {
		const axios = getAxiosInstance();
		const { data } = await axios.post('/plans/destinations', {
			...body,
		});
		const destinations: PlanResponse = data.data;
		return destinations;
	} catch (error) {
		handleAxiosError(error, 'fetchDestination');
	}
};

export const addBannerToPlan = async (body: {
	planDetailId: string;
	bannerId?: string;
	time: string;
}) => {
	try {
		console.log(body);
		const axios = getAxiosInstance();
		const { data } = await axios.post('/plans/banners', {
			...body,
		});
		const banners: PlanResponse = data.data;
		return banners;
	} catch (error) {
		handleAxiosError(error, 'addBannerToPlan');
	}
};
