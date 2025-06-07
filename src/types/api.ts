export interface ApiResponse<T> {
	success: boolean
	data: T
	message?: string
}

export interface CreateUrlRequest {
	originalUrl: string
	alias?: string
	expiresAt?: string
}
