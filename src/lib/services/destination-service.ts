import {
	getAxiosInstance,
	getAxiosWithCookie,
	handleAxiosError,
} from '../axios';
import { DestinationResponse } from '@/types/destination';
import { PlanResponse } from '@/types/plan';

export const fetchDestinationServer = async (cookieStore: string) => {
	try {
		const axios = getAxiosWithCookie(cookieStore);
		const { data } = await axios.get('/destinations');
		const destinations: DestinationResponse[] = data.data;
		return destinations;
	} catch (error) {
		handleAxiosError(error, 'fetchDestination');
	}
};

export const fetchDestination = async (cookieStore: string) => {
	try {
		const axios = getAxiosInstance();
		const { data } = await axios.get('/destinations');
		const destinations: DestinationResponse[] = data.data;
		return destinations;
	} catch (error) {
		handleAxiosError(error, 'fetchDestination');
	}
};

export const addDestinationToPlan = async (body: {
	planDetailId: string;
	destinationId: string;
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
