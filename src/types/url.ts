export interface UrlData {
	id: string
	originalUrl: string
	shortUrl: string
	shortCode: string
	alias?: string
	clickCount: number
	expiresAt?: string
	createdAt: string
}

export interface UrlInfo {
	originalUrl: string
	createdAt: string
	clickCount: number
}
