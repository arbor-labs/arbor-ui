/**
 * Source: https://github.com/dotansimha/graphql-code-generator/discussions/9571
 */

import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import {
	GetNextPageParamFunction,
	InfiniteData,
	QueryKey,
	skipToken,
	useInfiniteQuery,
	UseInfiniteQueryOptions,
	useMutation,
	type UseMutationOptions,
	useQuery,
	type UseQueryOptions,
} from '@tanstack/react-query'
import { type DirectiveDefinitionNode } from 'graphql'
import { GraphQLClient, request, type RequestOptions } from 'graphql-request'

const GRAPHQL_API_BASE_URL = 'http://localhost:5280/graphql'

export const getKey = <TData = unknown, TVariables = unknown>(document: TypedDocumentNode<TData, TVariables>) => [
	(document.definitions[0] as DirectiveDefinitionNode).name.value,
]

export const useGqlQuery = <TData = unknown, TVariables = unknown, TError = unknown>(
	document: TypedDocumentNode<TData, TVariables>,
	variables?: TVariables,
	options?: Omit<UseQueryOptions<TData, TError, TData>, 'queryKey'>,
	requestHeaders?: RequestOptions['requestHeaders'],
	queryKey?: unknown,
) => {
	const enabled = options?.enabled ?? true
	return useQuery<TData, TError, TData>({
		...options,
		queryKey: [GRAPHQL_API_BASE_URL, ...getKey(document), queryKey ?? variables, requestHeaders],
		queryFn: enabled
			? async ({ signal }) => {
					const client = new GraphQLClient(GRAPHQL_API_BASE_URL, {
						signal,
					})

					return await client.request({
						document,
						...(variables && { variables }),
						...(requestHeaders && { requestHeaders }),
					})
				}
			: skipToken,
	})
}

/**
 * Important: Every query must have a unique name i.e. `query UniqueName { ... }`;
 * otherwise, a cached result for one query may be used for another.
 */
export const useGqlMutation = <TData = unknown, TVariables = unknown, TError = unknown, TContext = unknown>(
	document: TypedDocumentNode<TData, TVariables>,
	options?: UseMutationOptions<TData, TError, TVariables, TContext>,
	requestHeaders?: RequestOptions['requestHeaders'],
) => {
	return useMutation<TData, TError, TVariables, TContext>({
		...options,
		mutationKey: [GRAPHQL_API_BASE_URL, ...getKey(document), requestHeaders],
		mutationFn: (variables?: TVariables) =>
			request({
				url: GRAPHQL_API_BASE_URL,
				document,
				...(variables && { variables }),
				...(requestHeaders && { requestHeaders }),
			}),
	})
}

interface UseGqlInfiniteOptions<TData = unknown, TVariables = unknown, TError = unknown, TPageParam = unknown> {
	document: TypedDocumentNode<TData, TVariables>
	variables?: TVariables
	options?: UseInfiniteQueryOptions<TData, TError, TData, TData, QueryKey, TPageParam>
	requestHeaders?: RequestOptions['requestHeaders']
	/**
	 * The name of the GraphQL variable that the query will read the pageParam from.
	 * @default cursor
	 */
	pageParamKey?: string
	/**
	 * @example ""
	 * @example 0
	 * Note we cannot provide a default here since we don't know what type the cursor will be.
	 */
	initialPageParam: TPageParam
	/**
	 * @example
	 * ```typescript`
	 * (lastPage, _allPages) => lastPage.cursor
	 * ````
	 * Note we cannot provide a default here since there are no fields that `TData` is
	 * guaranteed to have.
	 */
	getNextPageParam: GetNextPageParamFunction<TPageParam, TData>
}

/**
 * Important: Every query must have a unique name i.e. `query UniqueName { ... }`;
 * otherwise, a cached result for one query may be used for another.
 *
 * @example Pass in current cursor, get back next cursor:
 * ```typescript
 * const query = graphql(`
 * query PaginatedProjects($cursor: String) {
 *   projects(cursor: $cursor) {
 *     projects {
 *       id
 *     }
 *     cursor
 *   }
 * }
 * `)
 * useGqlInfinite({
 *  document: query,
 *  initialPageParam: '',
 *  getNextPageParam: (lastPage, _allPages) => lastPage.cursor,
 * })
 * ```
 */
export const useGqlInfinite = <TData = unknown, TVariables = unknown, TError = unknown, TPageParam = unknown>(
	options: UseGqlInfiniteOptions<TData, TVariables, TError, TPageParam>,
) => {
	useInfiniteQuery<TData, TError, InfiniteData<TData>, QueryKey, TPageParam>({
		queryKey: [
			GRAPHQL_API_BASE_URL,
			...getKey(options.document),
			options.variables,
			options.requestHeaders,
			options.pageParamKey,
		],
		queryFn: async context => {
			const client = new GraphQLClient(GRAPHQL_API_BASE_URL, {
				signal: context.signal,
			})
			return await client.request({
				document: options.document,
				variables: {
					...options.variables,
					[options.pageParamKey ?? 'cursor']: 'pageParam' in context ? context.pageParam : undefined,
				},
			})
		},
		initialPageParam: options.initialPageParam,
		getNextPageParam: options.getNextPageParam,
	})
}
