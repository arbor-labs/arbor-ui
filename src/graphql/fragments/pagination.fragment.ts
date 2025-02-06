import { gql } from '../graphql'

export const paginationFragment = gql(`
	fragment PaginationFields on PaginationMeta @_unmask {
		currentPage
		totalPages
		itemsPerPage
		itemCount
		totalItems
		itemType
	}
`)
