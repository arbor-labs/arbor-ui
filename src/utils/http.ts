export const get = async (url: string) => {
	const resp = await fetch(url, {
		method: 'GET',
		headers: {
			Accept: 'audio/*, application/json',
		},
	})
	const data = await resp.json()
	return data
}

export async function getBlob(url: string) {
	const response = await fetch(url, {
		headers: {
			Accept: 'audio/*',
		},
	})
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`)
	}
	return await response.arrayBuffer()
}

// export const post = async (url: string, body: any) => {
// 	const resp = await fetch(url, {
// 		method: 'POST',
// 		body: JSON.stringify(body),
// 	})
// 	const data = await resp.json()
// 	return data
// }

export async function postFormData(url: string, formData: FormData) {
	const response = await fetch(url, {
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
