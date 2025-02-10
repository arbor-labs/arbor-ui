import { paginationFragment } from '../fragments/pagination.fragment'
import { gql, ResultOf, useGqlQuery } from '../graphql'

const QUERY_PROJECTS_LIST = gql(
	`
	query GetProjectsList {
		projects {
			items {
				id
				name
				description
				bpm
				trackLimit
				tags
				stems {
					id
				}
				collaborators {
				  id
				  address
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

export const useGetProjects = () => {
	return useGqlQuery(QUERY_PROJECTS_LIST)
}

export type ProjectCardData = NonNullable<ResultOf<typeof QUERY_PROJECTS_LIST>['projects']['items']>[number]
