import { gql } from '../graphql'

export const accountFragment = gql(`
	fragment AccountFields on Account @_unmask {
		id
		address
		displayName
		avatarUrl
		createdAt
		updatedAt
	}
`)
