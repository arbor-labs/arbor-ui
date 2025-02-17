import { Address } from 'viem'

import { accountFragment } from '../fragments/account.fragment'
import { projectCardFragment } from '../fragments/project-card.fragment'
import { gql, ResultOf, useGqlQuery } from '../graphql'

const QUERY_USER_DETAILS = gql(
	`
	query GetUserDetails($address: EthereumAddress!) {
		account(address: $address) {
			...AccountFields
			createdAt
			updatedAt
			createdProjects {
				...ProjectCardFields
			}
			collaboratedProjects {
				...ProjectCardFields
			}
			uploadedStems {
				id
				name
				type
				filetype
				filesize
				createdAt
				createdBy {
					id
					address
				}
				projectsAddedTo {
					id
					name
				}
			}
		}
	}
`,
	[accountFragment, projectCardFragment],
)

export const useUserDetails = (address: Address) => {
	return useGqlQuery(QUERY_USER_DETAILS, { address })
}

export type UserDetailsData = NonNullable<ResultOf<typeof QUERY_USER_DETAILS>['account']>
