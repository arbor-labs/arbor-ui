import { initGraphQLTada } from 'gql.tada'
import type { Address, Hex } from 'viem'

import type { introspection } from './graphql-env.d.ts'

/**
 * Same API as `graphql-codegen`, but does not need a watch process:
 * @example
 * ```typescript
 * const QUERY_GET_PROJECT = gql(`
 *   query GetProject($id: String!) {
 *     project(id: $id) {
 *       name
 *     }
 *   }
 * `)
 */
export const gql = initGraphQLTada<{
	introspection: introspection
	scalars: {
		// As a query input, the client can pass in `Date` or `string` (thanks to `JSON.stringify`).
		// However, the query result will always come back as an un-decoded `string`
		// (but they are working on this: jasonkuhrt/graphql-request#672).
		// Thus, sadly, we cannot annotate `DateTimeISO: Date` on the client-side.
		// DateTimeISO: Date | string
		EthereumAddress: Address
		EthereumHash: Hex
		EthereumSignature: Hex
	}
}>()

/**
 * @example
 * ```typescript
 * export type CreateOrderInput = GqlType<'CreateOrderInput'>
 * ```
 */
export type GqlType<T extends string> = ReturnType<typeof gql.scalar<T>>

export { type FragmentOf, readFragment, type ResultOf, type VariablesOf } from 'gql.tada'
