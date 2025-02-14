import { gql, ResultOf, useGqlQuery } from '../graphql'

const QUERY_GET_PINATA_FILE = gql(`
	query GetPinataFile($cid: String!) {
		getFile(cid: $cid) {
			contentType
			data
		}
	}
`)

export const usePinataFile = (cid: string) => {
	return useGqlQuery(QUERY_GET_PINATA_FILE, { cid })
}

export type PinataFileData = ResultOf<typeof QUERY_GET_PINATA_FILE>['getFile']
