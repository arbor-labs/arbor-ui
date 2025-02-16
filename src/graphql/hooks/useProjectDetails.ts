import { gql, ResultOf, useGqlQuery } from '../graphql'

const QUERY_PROJECT_DETAILS = gql(
	`
	query GetProjectDetails($id: String!) {
		project(id: $id) {
			id
			name
			description
			bpm
			trackLimit
			tags
			createdAt
			updatedAt
			createdBy {
				address
			}
			collaborators {
				address
			}
			stems {
				id
				name
				type
				filename
				audioCID
				createdBy {
					address
				}
			}
			queue {
				id
			}
		}
	}
`,
)

export const useProjectDetails = (id: string) => {
	return useGqlQuery(QUERY_PROJECT_DETAILS, { id })
}

export type ProjectDetailsData = NonNullable<ResultOf<typeof QUERY_PROJECT_DETAILS>['project']>
export type ProjectStemData = NonNullable<ProjectDetailsData['stems']>[number]
