import type {SummaryAnalytics} from '../types/analytics'

export const calculateAnalyticsTotals = (summaryData: SummaryAnalytics[]) => {
	return {
		totalClicks: summaryData.reduce((sum, item) => sum + item.totalClicks, 0),
		totalUniqueVisitors: summaryData.reduce(
			(sum, item) => sum + item.uniqueVisitors,
			0,
		),
		totalClicks24h: summaryData.reduce(
			(sum, item) => sum + item.clicksLast24h,
			0,
		),
		totalUrls: summaryData.length,
	}
}

export const truncateUrl = (url: string, maxLength: number = 40): string => {
	return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url
}

export const truncateUserAgent = (
	userAgent: string,
	maxLength: number = 50,
): string => {
	return userAgent.length > maxLength
		? `${userAgent.substring(0, maxLength)}...`
		: userAgent
}
