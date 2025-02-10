import { gql, ResultOf, useGqlQuery } from '../graphql'

const QUERY_PROJECT_DETAILS = gql(
	`
	query GetProjectDetails($id: String!) {
		project(id: $id) {
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
				address
			}
			collaborators {
				address
			}
		}
	}
`,
)

export const useProjectDetails = (id: string) => {
	return useGqlQuery(QUERY_PROJECT_DETAILS, { id })
}

export type ProjectDetailsData = ResultOf<typeof QUERY_PROJECT_DETAILS>['project']
