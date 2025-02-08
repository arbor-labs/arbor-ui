import { Address } from 'viem'

import { accountFragment } from '../fragments/account.fragment'
import { gql, ResultOf, useGqlQuery } from '../graphql'

const QUERY_GET_ACCOUNT = gql(
	`
	query GetAccountByAddress($address: EthereumAddress!) {
		account(address: $address) {
			...AccountFields
		}
	}
`,
	[accountFragment],
)

export const useAccount = (address: Address, retry: boolean) => {
	return useGqlQuery(QUERY_GET_ACCOUNT, { address }, { retry })
}

export type AccountData = ResultOf<typeof QUERY_GET_ACCOUNT>['account']
