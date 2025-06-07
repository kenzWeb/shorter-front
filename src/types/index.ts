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

export interface CreateUrlRequest {
	originalUrl: string
	alias?: string
	expiresAt?: string
}

export interface UrlInfo {
	originalUrl: string
	createdAt: string
	clickCount: number
}

export interface ClickStatistic {
	clickedAt: string
	ipAddress: string
	userAgent: string
}

export interface DetailedStats {
	url: {
		originalUrl: string
		shortCode: string
		createdAt: string
		clickCount: number
	}
	statistics: ClickStatistic[]
}

export interface Analytics {
	shortCode: string
	originalUrl: string
	clickCount: number
	lastFiveIPs: string[]
	createdAt: string
}

export interface SummaryAnalytics {
	shortCode: string
	originalUrl: string
	totalClicks: number
	uniqueVisitors: number
	clicksLast24h: number
	createdAt: string
}

export interface ApiResponse<T> {
	success: boolean
	data: T
	message?: string
}
