/**
 * A helper for JSON.stringify that removes circular references
 * @param obj The object to JSON.stringify
 * @returns A stringified JSON object without circular references
 */
export const stringify = (obj: unknown) => {
	let cache: string[] = []
	const str = JSON.stringify(obj, function (_key, value) {
		if (typeof value === 'object' && value !== null) {
			if (cache.indexOf(value) !== -1) {
				// Circular reference found, discard key
				return
			}
			// Store value in our collection
			cache.push(value)
		}
		return value
	})
	cache = [] // reset the cache
	return str
}
