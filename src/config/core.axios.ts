import axios, { AxiosError } from 'axios';

import { environment } from '../environment';

const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};
export const CoreApiInstance = axios.create({
	baseURL: environment.PUBLIC_API_URL,
	headers,
	httpsAgent: {
		rejectUnauthorized: false,
	},
});
CoreApiInstance.interceptors.request.use(
	async (config: any) => {
		return config;
	},
	(error: any) => {
		return Promise.reject(error);
	}
);
CoreApiInstance.interceptors.response.use(
	(response: any) => {
		console.log('response:', {
			response,
			path: response?.config?.url,
		});

		return response;
	},
	async (error: AxiosError) => {
		return Promise.reject(error);
	}
);
