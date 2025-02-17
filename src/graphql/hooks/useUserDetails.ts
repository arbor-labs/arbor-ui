import { Address } from 'viem'

import { accountFragment } from '../fragments/account.fragment'
import { gql, ResultOf, useGqlQuery } from '../graphql'

const QUERY_USER_DETAILS = gql(
	`
	query GetUserDetails($address: EthereumAddress!) {
		account(address: $address) {
			...AccountFields
			createdProjects {
				id
				name
			}
			collaboratedProjects {
				id
				name
			}
			uploadedStems {
				id
			}
	}
	}
`,
	[accountFragment],
)

export const useUserDetails = (address: Address) => {
	return useGqlQuery(QUERY_USER_DETAILS, { address })
}

export type UserDetailsData = NonNullable<ResultOf<typeof QUERY_USER_DETAILS>['account']>
