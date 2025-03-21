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
			createdAt
			createdBy {
				id
				address
				avatarUri
			}
			projectsAddedTo {
				id
				name
			}
		}
	}
`,
)

export const useStemDetails = (id: string) => useGqlQuery(QUERY_STEM_DETAILS, { id })

export type StemDetailsData = NonNullable<ResultOf<typeof QUERY_STEM_DETAILS>['stem']>
