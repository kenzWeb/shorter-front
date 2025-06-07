export const debounce = <T extends (...args: unknown[]) => void>(
	func: T,
	delay: number,
): ((...args: Parameters<T>) => void) => {
	let timeoutId: NodeJS.Timeout
	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => func(...args), delay)
	}
}

export const throttle = <T extends (...args: unknown[]) => void>(
	func: T,
	delay: number,
): ((...args: Parameters<T>) => void) => {
	let lastCall = 0
	return (...args: Parameters<T>) => {
		const now = Date.now()
		if (now - lastCall >= delay) {
			lastCall = now
			func(...args)
		}
	}
}

export const sleep = (ms: number): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export const retry = async <T>(
	fn: () => Promise<T>,
	maxAttempts: number = 3,
	delay: number = 1000,
): Promise<T> => {
	let lastError: Error

	for (let attempt = 1; attempt <= maxAttempts; attempt++) {
		try {
			return await fn()
		} catch (error) {
			lastError = error as Error
			if (attempt === maxAttempts) {
				throw lastError
			}
			await sleep(delay * attempt)
		}
	}

	throw lastError!
}
