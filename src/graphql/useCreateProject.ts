// import { graphql } from 'gql.tada'

// import { useGqlMutation } from '$/graphql/graphql'

// const MUTATION_CREATE_PROJECT = graphql(`
// 	mutation CreateNewProject {
// 		createProject(
// 			createProjectInput: {
// 				createdBy: "0x5B4C6e68637618285d2792d2934dF552E23c62C2"
// 				name: "Test Project 3"
// 				description: "This is an example description"
// 				bpm: 120
// 				trackLimit: 10
// 			}
// 		) {
// 			id
// 			createdAt
// 			updatedAt
// 			name
// 			description
// 			bpm
// 			trackLimit
// 			tags
// 			stems {
// 				id
// 				bpm
// 			}
// 			queue {
// 				id
// 				stems {
// 					id
// 					votes
// 				}
// 			}
// 			createdBy {
// 				id
// 				address
// 			}
// 			collaborators {
// 				id
// 				address
// 			}
// 		}
// 	}
// `)

// export const useCreateProject = () => {
// 	return useGqlMutation(MUTATION_CREATE_PROJECT)
// }
