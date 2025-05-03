import { BannerResponse } from '@/types/banner';
import { getAxiosInstance, handleAxiosError } from '../axios';
import { DestinationResponse } from '@/types/destination';

export const fetchUserBanners = async () => {
	try {
		const axios = getAxiosInstance();
		const { data } = await axios.get(`/users/banners`);
		const response: BannerResponse[] = data.data;
		return response;
	} catch (error) {
		handleAxiosError(error, 'fetchUserBanners');
	}
};

export const fetchUserDestinations = async () => {
	try {
		const axios = getAxiosInstance();
		const { data } = await axios.get(`/users/destinations`);
		const response: DestinationResponse[] = data.data;
		return response;
	} catch (error) {
		handleAxiosError(error, 'fetchUserDestinations');
	}
};
