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

export const useAccount = (address: Address) => {
	const resp = useGqlQuery(QUERY_GET_ACCOUNT, { address })
	// console.log(resp)
	return resp
}

export type AccountData = ResultOf<typeof QUERY_GET_ACCOUNT>['account']
