import { initGraphQLTada } from 'gql.tada'
import type { Address, Hex } from 'viem'

import type { introspection } from './graphql-env.d.ts'

export const gql = initGraphQLTada<{
	introspection: introspection
	scalars: {
		// As a query input, the client can pass in `Date` or `string` (thanks to `JSON.stringify`).
		// However, the query result will always come back as an un-decoded `string`
		// (but they are working on this: jasonkuhrt/graphql-request#672).
		// Thus, sadly, we cannot annotate `DateTimeISO: Date` on the client-side.
		DateTimeISO: Date | string
		EthereumAddress: Address
		EthereumHash: Hex
		EthereumSignature: Hex
	}
}>()

export { type FragmentOf, readFragment, type ResultOf, type VariablesOf } from 'gql.tada'
