import { gql, ResultOf, useGqlQuery } from '../graphql'

const QUERY_STEM_DETAILS = gql(
	`
	query GetStemDetails($id: String!) {
		stem(id: $id) {
			id
			name
			type
			metadataCID
			audioCID
			filename
			filetype
			filesize
			createdBy {
				id
				address
			}
			projectsAddedTo {
				id
				name
			}
			createdAt
			updatedAt
		}
	}
`,
)

export function useStemDetails(id: string) {
	return useGqlQuery(QUERY_STEM_DETAILS, { id })
}

export type StemDetailsData = ResultOf<typeof QUERY_STEM_DETAILS>['stem']
