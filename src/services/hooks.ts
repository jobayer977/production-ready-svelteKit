import type {
	MutationConfig,
	QueryConfig,
} from '../config/svelte-query-client';
import { useMutation, useQuery } from '@sveltestack/svelte-query';

import { ApiService } from './apis';

type ILoginMutation = {
	config?: MutationConfig<typeof ApiService.signIn>;
};
export const useLoginMutation = ({ config }: ILoginMutation) => {
	return useMutation(ApiService.signIn, config);
};

type UserUserQuery = {
	config?: QueryConfig<typeof ApiService.userById>;
	id: string;
};
export const useUserByIdQuery = ({ config, id }: UserUserQuery) => {
	const KEY = `${ApiService.userById.name}`;
	return useQuery([KEY], () => ApiService.userById({ id }), config);
};
