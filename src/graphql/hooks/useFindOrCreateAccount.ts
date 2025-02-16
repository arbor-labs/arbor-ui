// import { accountFragment } from '../fragments/account.fragment'
// import { gql, ResultOf, useGqlMutation } from '../graphql'

// const MUTATION_FIND_OR_CREATE_ACCOUNT = gql(
// 	`
// 	mutation FindOrCreateAccount($address: EthereumAddress!, $signature: EthereumSignature!) {
// 		findOrCreateAccount(
// 			createAccountInput: {
// 				address: $address,
// 				signature: $signature
// 			}
// 		) {
// 			...AccountFields
// 		}
// 	}
// `,
// 	[accountFragment],
// )

// export const useFindOrCreateAccount = () => {
// 	return useGqlMutation(MUTATION_FIND_OR_CREATE_ACCOUNT)
// }

// export type AccountData = ResultOf<typeof MUTATION_FIND_OR_CREATE_ACCOUNT>['findOrCreateAccount']
