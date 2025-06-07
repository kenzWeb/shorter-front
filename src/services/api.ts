import axios from 'axios'
import type {
	Analytics,
	ApiResponse,
	CreateUrlRequest,
	DetailedStats,
	SummaryAnalytics,
	UrlData,
	UrlInfo,
} from '../types'

const BASE_URL = 'http://localhost:3000'

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

export const urlService = {
	async createShortUrl(data: CreateUrlRequest): Promise<UrlData> {
		const response = await api.post<ApiResponse<UrlData>>('/shorten', data)
		return response.data.data
	},

	async getAllUrls(): Promise<UrlData[]> {
		const response = await api.get<ApiResponse<UrlData[]>>('/api/urls')
		return response.data.data
	},

	async getUrlInfo(shortCode: string): Promise<UrlInfo> {
		const response = await api.get<ApiResponse<UrlInfo>>(`/info/${shortCode}`)
		return response.data.data
	},

	async deleteUrl(shortCode: string): Promise<void> {
		await api.delete(`/delete/${shortCode}`)
	},

	async getDetailedStats(shortCode: string): Promise<DetailedStats> {
		const response = await api.get<ApiResponse<DetailedStats>>(
			`/stats/${shortCode}`,
		)
		return response.data.data
	},

	async getAnalytics(shortCode: string): Promise<Analytics> {
		const response = await api.get<ApiResponse<Analytics>>(
			`/analytics/${shortCode}`,
		)
		return response.data.data
	},

	async getSummaryAnalytics(): Promise<SummaryAnalytics[]> {
		const response = await api.get<ApiResponse<SummaryAnalytics[]>>(
			'/analytics/summary',
		)
		return response.data.data
	},
}
