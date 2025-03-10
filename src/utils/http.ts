import { API_BASE_URL } from '$/lib/constants'

// Utility for building the url
const getUrl = (route: string) => {
	if (!route.startsWith('/')) route = `/${route}`
	return `${API_BASE_URL}${route}`
}

// GET requests
export const get = async (route: string) => {
	const resp = await fetch(getUrl(route), {
		method: 'GET',
		headers: {
			Accept: 'audio/*, application/json',
		},
	})
	const data = await resp.json()
	return data
}

// GET requests for audio files
export async function getBlob(route: string) {
	const response = await fetch(getUrl(route), {
		headers: {
			Accept: 'audio/*',
		},
	})
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`)
	}
	return await response.arrayBuffer()
}

// POST requests
export const post = async (route: string, body: unknown) => {
	const resp = await fetch(getUrl(route), {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const data = await resp.json()
	return data
}

// POST requests for form data
export async function postFormData(route: string, formData: FormData) {
	const response = await fetch(getUrl(route), {
		method: 'POST',
		body: formData,
		headers: {
			Accept: 'application/json',
		},
	})
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`)
	}
	return await response.json()
}
