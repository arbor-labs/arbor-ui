import { gql } from './gql'

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
