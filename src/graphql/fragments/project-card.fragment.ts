import { gql } from '../graphql'

export const projectCardFragment = gql(`
	fragment ProjectCardFields on Project @_unmask {
		id
		name
		description
		tags
		trackLimit
		stems {
			id
		}
		collaborators {
			id
		}
	}
`)
