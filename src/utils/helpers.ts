export const formatDate = (dateString: string): string => {
	const date = new Date(dateString)
	return date.toLocaleString('ru-RU')
}

export const formatRelativeTime = (dateString: string): string => {
	const date = new Date(dateString)
	const now = new Date()
	const diffInMs = now.getTime() - date.getTime()
	const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
	const diffInDays = Math.floor(diffInHours / 24)

	if (diffInHours < 1) {
		return 'только что'
	} else if (diffInHours < 24) {
		return `${diffInHours} ч. назад`
	} else if (diffInDays < 7) {
		return `${diffInDays} дн. назад`
	} else {
		return formatDate(dateString)
	}
}

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

export const copyToClipboard = async (text: string): Promise<boolean> => {
	try {
		await navigator.clipboard.writeText(text)
		return true
	} catch {
		return false
	}
}
