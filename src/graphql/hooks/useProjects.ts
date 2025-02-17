import { paginationFragment } from '../fragments/pagination.fragment'
import { projectCardFragment } from '../fragments/project-card.fragment'
import { gql, ResultOf, useGqlQuery } from '../graphql'

const QUERY_PROJECTS_LIST = gql(
	`
	query GetProjectsList {
		projects {
			items {
				...ProjectCardFields
			}
			meta {
				...PaginationFields
			}
		}
	}
`,
	[paginationFragment, projectCardFragment],
)

export const useGetProjects = () => {
	return useGqlQuery(QUERY_PROJECTS_LIST)
}

export type ProjectCardData = NonNullable<ResultOf<typeof QUERY_PROJECTS_LIST>['projects']['items']>[number]
