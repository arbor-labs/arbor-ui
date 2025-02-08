import { accountFragment } from '../fragments/account.fragment'
import { gql, ResultOf, useGqlMutation } from '../graphql'

const MUTATION_CREATE_ACCOUNT = gql(
	`
	mutation CreateNewAccount($address: EthereumAddress!, $signature: EthereumSignature!) {
		createAccount(
			createAccountInput: {
				address: $address,
				signature: $signature
			}
		) {
			...AccountFields
		}
	}
`,
	[accountFragment],
)

export const useCreateAccount = () => {
	return useGqlMutation(MUTATION_CREATE_ACCOUNT)
}

export type AccountData = ResultOf<typeof MUTATION_CREATE_ACCOUNT>['createAccount']
