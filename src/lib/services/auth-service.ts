import { UserResponse } from '@/types/auth';
import { getAxiosInstance, handleAxiosError } from '../axios';
import { RegisterInput } from '../validations/auth-schema';

export const register = async (body: RegisterInput) => {
	try {
		const axios = getAxiosInstance();
		const { data } = await axios.post(`/auth/register`, {
			...body,
		});
		const response: UserResponse = data.data;
		return response;
	} catch (error) {
		handleAxiosError(error, 'createBanner');
	}
};
