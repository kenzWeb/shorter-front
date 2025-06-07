export const isValidUrl = (url: string): boolean => {
	try {
		new URL(url)
		return true
	} catch {
		return false
	}
}

export const isValidAlias = (alias: string): boolean => {
	return alias.length <= 20 && /^[a-zA-Z0-9-_]+$/.test(alias)
}

export const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}

export const isValidDateInFuture = (dateString: string): boolean => {
	const date = new Date(dateString)
	return date > new Date()
}

export const validateStringLength = (str: string, min: number = 0, max: number = Infinity): boolean => {
	return str.length >= min && str.length <= max
}
