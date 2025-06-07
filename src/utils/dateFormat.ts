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

export const formatDateShort = (dateString: string): string => {
	const date = new Date(dateString)
	return date.toLocaleDateString('ru-RU')
}

export const formatTimeOnly = (dateString: string): string => {
	const date = new Date(dateString)
	return date.toLocaleTimeString('ru-RU', {
		hour: '2-digit',
		minute: '2-digit',
	})
}
