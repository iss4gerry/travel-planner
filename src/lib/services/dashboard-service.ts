import { BannerResponse } from '@/types/banner';
import { getAxiosInstance, handleAxiosError } from '../axios';
import { DestinationResponse } from '@/types/destination';
import { Category } from '@/types/category';
import { CreateDestination } from '../validations/destination-schema';

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

export const fetchCategories = async () => {
	try {
		const axios = getAxiosInstance();
		const { data } = await axios.get(`/categories`);
		const response: Category[] = data.data;
		return response;
	} catch (error) {
		handleAxiosError(error, 'fetchCategories');
	}
};

export const createDestination = async (body: CreateDestination) => {
	try {
		const axios = getAxiosInstance();
		const { data } = await axios.post(`/destinations`, {
			...body,
		});
		const response: DestinationResponse = data.data;
		return response;
	} catch (error) {
		handleAxiosError(error, 'createDestination');
	}
};
