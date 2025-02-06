import { gql, ResultOf, useGqlMutation } from '../graphql'

const MUTATION_CREATE_PROJECT = gql(`
	mutation CreateNewProject($createProjectInput: CreateProjectInput!) {
		createProject(createProjectInput: $createProjectInput) {
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
				# 	id
				# 	votes
				# }
			}
			createdBy {
				id
				address
			}
			collaborators {
				id
				address
			}
		}
	}
`)

export const useCreateProject = () => {
	return useGqlMutation(MUTATION_CREATE_PROJECT)
}

export type NewProjectData = ResultOf<typeof MUTATION_CREATE_PROJECT>['createProject']
