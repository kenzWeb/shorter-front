export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
	try {
		const item = localStorage.getItem(key)
		return item ? JSON.parse(item) : defaultValue
	} catch {
		return defaultValue
	}
}

export const setToLocalStorage = <T>(key: string, value: T): void => {
	try {
		localStorage.setItem(key, JSON.stringify(value))
	} catch (error) {
		console.error('Error saving to localStorage:', error)
	}
}

export const removeFromLocalStorage = (key: string): void => {
	try {
		localStorage.removeItem(key)
	} catch (error) {
		console.error('Error removing from localStorage:', error)
	}
}

export const clearLocalStorage = (): void => {
	try {
		localStorage.clear()
	} catch (error) {
		console.error('Error clearing localStorage:', error)
	}
}

export const getFromSessionStorage = <T>(key: string, defaultValue: T): T => {
	try {
		const item = sessionStorage.getItem(key)
		return item ? JSON.parse(item) : defaultValue
	} catch {
		return defaultValue
	}
}

export const setToSessionStorage = <T>(key: string, value: T): void => {
	try {
		sessionStorage.setItem(key, JSON.stringify(value))
	} catch (error) {
		console.error('Error saving to sessionStorage:', error)
	}
}
