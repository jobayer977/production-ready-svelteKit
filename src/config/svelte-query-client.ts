import {
	QueryClient,
	type UseMutationOptions,
	type UseQueryOptions,
} from '@sveltestack/svelte-query';

type PromiseValue<
	PromiseType,
	Otherwise = PromiseType
> = PromiseType extends Promise<infer Value>
	? { 0: PromiseValue<Value>; 1: Value }[PromiseType extends Promise<unknown>
			? 0
			: 1]
	: Otherwise;

export const svelteQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			useErrorBoundary: true,
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});
export type QueryConfig<FetcherFnType extends (...args: any) => any> =
	UseQueryOptions<PromiseValue<ReturnType<FetcherFnType>>>;
export type MutationConfig<FetcherFnType extends (...args: any) => any> =
	UseMutationOptions<
		PromiseValue<ReturnType<FetcherFnType>>,
		Error,
		Parameters<FetcherFnType>[0],
		FetcherFnType
	>;
