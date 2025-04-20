import { BannerResponse } from '@/types/banner';
import {
	axiosWithCookie,
	axiosWithoutCookie,
	handleAxiosError,
} from '../axios';
import { DestinationResponse } from '@/types/destination';

export const fetchDestinationServer = async (cookieStore: string) => {
	try {
		const axios = await axiosWithCookie(cookieStore);
		const { data } = await axios.get('/destinations');
		const destinations: DestinationResponse[] = data.data;
		return destinations;
	} catch (error) {
		handleAxiosError(error, 'fetchDestination');
	}
};

export const fetchDestination = async (cookieStore: string) => {
	try {
		const axios = await axiosWithoutCookie();
		const { data } = await axios.get('/destinations');
		const destinations: DestinationResponse[] = data.data;
		return destinations;
	} catch (error) {
		handleAxiosError(error, 'fetchDestination');
	}
};
