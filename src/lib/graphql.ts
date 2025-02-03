import { type TypedDocumentNode } from '@graphql-typed-document-node/core'
import { skipToken, useMutation, type UseMutationOptions, useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { type DirectiveDefinitionNode } from 'graphql'
import { GraphQLClient, request, type RequestOptions } from 'graphql-request'

const GRAPHQL_API_BASE_URL = 'http://localhost:5280/graphql'

/**
 * Source: https://github.com/dotansimha/graphql-code-generator/discussions/9571
 */
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
