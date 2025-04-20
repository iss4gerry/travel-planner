import { BannerResponse } from '@/types/banner';
import {
	axiosWithCookie,
	axiosWithoutCookie,
	handleAxiosError,
} from '../axios';

export const fetchBannerServer = async (cookieStore: string) => {
	try {
		const axios = await axiosWithCookie(cookieStore);
		const { data } = await axios.get('/banners');
		const banners: BannerResponse[] = data.data;
		return banners;
	} catch (error) {
		handleAxiosError(error, 'fetchPlan');
		throw error;
	}
};

export const fetchBannerClient = async () => {
	try {
		const axios = await axiosWithoutCookie();
		const { data } = await axios.get('/banners');
		const banners: BannerResponse[] = data.data;
		return banners;
	} catch (error) {
		handleAxiosError(error, 'fetchPlan');
	}
};
