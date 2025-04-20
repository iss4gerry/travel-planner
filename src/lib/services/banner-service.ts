import { BannerResponse } from '@/types/banner';
import {
	getAxiosWithCookie,
	getAxiosInstance,
	handleAxiosError,
} from '../axios';

export const fetchBannerServer = async (cookieStore: string) => {
	try {
		const axios = getAxiosWithCookie(cookieStore);
		const { data } = await axios.get('/banners');
		const banners: BannerResponse[] = data.data;
		return banners;
	} catch (error) {
		handleAxiosError(error, 'fetchPlan');
	}
};

export const fetchBannerClient = async () => {
	try {
		const axios = getAxiosInstance();
		const { data } = await axios.get('/banners');
		const banners: BannerResponse[] = data.data;
		return banners;
	} catch (error) {
		handleAxiosError(error, 'fetchPlan');
	}
};
