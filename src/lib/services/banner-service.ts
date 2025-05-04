import { BannerResponse } from '@/types/banner';
import {
	getAxiosWithCookie,
	getAxiosInstance,
	handleAxiosError,
} from '../axios';
import { CreateBanner } from '../validations/banner-schema';

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

export const createBanner = async (body: CreateBanner) => {
	try {
		const axios = getAxiosInstance();
		const { data } = await axios.post(`/banners`, {
			...body,
		});
		const response: BannerResponse = data.data;
		return response;
	} catch (error) {
		handleAxiosError(error, 'createBanner');
	}
};
