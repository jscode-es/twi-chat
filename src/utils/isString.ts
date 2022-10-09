
export default function isString(data: any) {

	if (typeof data !== 'string') return false
	if (!data.length) return false

	return true
}