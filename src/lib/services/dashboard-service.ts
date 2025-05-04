import { BannerResponse } from '@/types/banner';
import { getAxiosInstance, handleAxiosError } from '../axios';
import { DestinationResponse } from '@/types/destination';

export const fetchUserBanners = async (params: {
	page: number;
	limit: number;
	sort: string;
	order: string;
}) => {
	try {
		const axios = getAxiosInstance();
		const { data } = await axios.get(`/users/banners`, {
			params: { ...params, limit: 3 },
		});
		const response: BannerResponse[] = data.data;
		const pagination: {
			page: number;
			limit: number;
			total: number;
			totalPages: number;
		} = data.pagination;
		return { response, pagination };
	} catch (error) {
		handleAxiosError(error, 'fetchUserBanners');
	}
};

export const fetchUserDestinations = async (params: {
	page: number;
	limit: number;
	sort: string;
	order: string;
}) => {
	try {
		const axios = getAxiosInstance();
		const { data } = await axios.get(`/users/destinations`, {
			params: { ...params, limit: 3 },
		});
		const response: DestinationResponse[] = data.data;
		const pagination: {
			page: number;
			limit: number;
			total: number;
			totalPages: number;
		} = data.pagination;
		return { response, pagination };
	} catch (error) {
		handleAxiosError(error, 'fetchUserDestinations');
	}
};
