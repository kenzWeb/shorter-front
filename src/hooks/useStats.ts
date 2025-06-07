import {useCallback, useState} from 'react'
import {urlService} from '../services/api'
import type {Analytics, SummaryAnalytics} from '../types/analytics'
import type {DetailedStats} from '../types/stats'
import type {UrlInfo} from '../types/url'

export const useStats = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const getUrlInfo = useCallback(
		async (shortCode: string): Promise<UrlInfo | null> => {
			setLoading(true)
			setError(null)
			try {
				return await urlService.getUrlInfo(shortCode)
			} catch {
				setError('Ошибка при загрузке информации о ссылке')
				return null
			} finally {
				setLoading(false)
			}
		},
		[],
	)

	const getDetailedStats = useCallback(
		async (shortCode: string): Promise<DetailedStats | null> => {
			setLoading(true)
			setError(null)
			try {
				return await urlService.getDetailedStats(shortCode)
			} catch {
				setError('Ошибка при загрузке детальной статистики')
				return null
			} finally {
				setLoading(false)
			}
		},
		[],
	)

	const getAnalytics = useCallback(
		async (shortCode: string): Promise<Analytics | null> => {
			setLoading(true)
			setError(null)
			try {
				return await urlService.getAnalytics(shortCode)
			} catch {
				setError('Ошибка при загрузке аналитики')
				return null
			} finally {
				setLoading(false)
			}
		},
		[],
	)

	const getSummaryAnalytics = useCallback(async (): Promise<
		SummaryAnalytics[]
	> => {
		setLoading(true)
		setError(null)
		try {
			return await urlService.getSummaryAnalytics()
		} catch {
			setError('Ошибка при загрузке общей аналитики')
			return []
		} finally {
			setLoading(false)
		}
	}, [])

	return {
		loading,
		error,
		getUrlInfo,
		getDetailedStats,
		getAnalytics,
		getSummaryAnalytics,
	}
}
