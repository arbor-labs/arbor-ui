import { paginationFragment } from '../fragments/pagination.fragment'
import { gql, ResultOf, useGqlQuery } from '../graphql'

const QUERY_STEMS_LIST = gql(
	/* GraphQL */ `
		query GetStemsList {
			stems {
				items {
					id
					name
					type
					createdAt
					createdBy {
						address
					}
					projectsAddedTo {
						id
						name
					}
				}
				meta {
					...PaginationFields
				}
			}
		}
	`,
	[paginationFragment],
)

export const useStemsList = () => useGqlQuery(QUERY_STEMS_LIST)

export type StemCardData = NonNullable<ResultOf<typeof QUERY_STEMS_LIST>['stems']['items']>[number]
