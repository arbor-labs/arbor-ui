import { paginationFragment } from '../fragments/pagination.fragment'
import { gql, ResultOf, useGqlQuery } from '../graphql'

const QUERY_STEMS_LIST = gql(
	`
	query GetStemsList {
		stems {
			items {
				id
				name
				type
				metadataCID
				audioCID
				filename
				filetype
				filesize
				createdBy {
					address
				}
				projectsAddedTo {
					id
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

export const useGetStems = () => {
	return useGqlQuery(QUERY_STEMS_LIST)
}

export type StemCardData = NonNullable<ResultOf<typeof QUERY_STEMS_LIST>['stems']>['items'][number]
