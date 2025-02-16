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
				avatarUri
			}
			collaborators {
				id
				address
				avatarUri
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
export type ProjectCollaboratorsData = NonNullable<ProjectDetailsData['collaborators']>
export type ProjectCollaboratorData = NonNullable<ProjectDetailsData['collaborators']>[number]
