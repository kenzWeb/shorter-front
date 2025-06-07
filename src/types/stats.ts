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
