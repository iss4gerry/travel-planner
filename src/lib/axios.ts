import axios from 'axios';

export const axiosWithCookie = async (cookieStore: string) => {
	const instance = axios.create({
		baseURL: `http://localhost:3002/api`,
		headers: {
			cookie: cookieStore,
		},
	});

	return instance;
};

export const axiosWithoutCookie = async () => {
	const instance = axios.create({
		baseURL: `http://localhost:3002/api`,
	});

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
