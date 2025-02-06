import { accountFragment } from '../fragments/account.fragment'
import { gql, useGqlMutation } from '../graphql'

const MUtATION_CREATE_ACCOUNT = gql(
	`
	mutation CreateNewAccount($address: EthereumAddress!) {
		createAccount(
			createAccountInput: {
				address: $address
			}
		) {
			...AccountFields
		}
	}
`,
	[accountFragment],
)

export const useCreateAccount = () => {
	return useGqlMutation(MUtATION_CREATE_ACCOUNT)
}
