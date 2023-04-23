import { CoreApiInstance } from '../config/core.axios';

export const ApiService = {
	signIn: async (data: { email: string; password: string }) => {
		return CoreApiInstance.post('/auth/signin', data);
	},
	userById: async (data: { id: string }) => {
		return CoreApiInstance.get(`/users/${data.id}`);
	},
};
