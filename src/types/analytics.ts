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
