import { gql, ResultOf } from './gql'
import { useGqlQuery } from './graphql'
import { paginationFragment } from './pagination.fragment'

const QUERY_GET_ALL_PROJECTS = gql(
	`
	query GetAllProjects {
		projects {
			items {
				id
				createdAt
				updatedAt
				name
				description
				bpm
				trackLimit
				tags
				stems {
					id
					bpm
				}
				queue {
					id
					# stems {
					#   id
					#   votes
					# }
				}
				createdBy {
					id
					address
				}
				# collaborators {
				#   id
				#   address
				# }
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
	return useGqlQuery(QUERY_GET_ALL_PROJECTS, 'GetAllProjects')
}

export type ProjectData = NonNullable<ResultOf<typeof QUERY_GET_ALL_PROJECTS>['projects']['items']>[number]
