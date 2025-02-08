import { ClientError } from 'graphql-request'

export const getErrorMessage = (error: unknown) => {
	if (error instanceof ClientError) {
		return error.response.errors?.[0]?.message ?? error.message
	} else if (error instanceof Error) {
		return error.message
	} else if (typeof error === 'string') {
		return error
	} else {
		return 'An unknown error occurred'
	}
}
