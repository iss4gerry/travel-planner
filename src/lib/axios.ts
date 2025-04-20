import axios, { AxiosInstance } from 'axios';

let axiosInstanceWithoutCookie: AxiosInstance | null = null;
const cookieInstancesMap = new Map<string, AxiosInstance>();

export const getAxiosInstance = (): AxiosInstance => {
	if (!axiosInstanceWithoutCookie) {
		axiosInstanceWithoutCookie = axios.create({
			baseURL: 'http://localhost:3002/api',
		});
	}

	return axiosInstanceWithoutCookie;
};

export const getAxiosWithCookie = (cookieStore: string): AxiosInstance => {
	if (cookieInstancesMap.has(cookieStore)) {
		return cookieInstancesMap.get(cookieStore)!;
	}

	const instance = axios.create({
		baseURL: 'http://localhost:3002/api',
		headers: {
			cookie: cookieStore,
		},
	});

	cookieInstancesMap.set(cookieStore, instance);
	return instance;
};

export function handleAxiosError(error: unknown, context?: string): never {
	if (axios.isAxiosError(error)) {
		const message =
			error.response?.data?.message || error.message || 'Axios request failed';

		throw new Error(message);
	}

	throw new Error('Unexpected error occurred');
}
