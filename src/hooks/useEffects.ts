import {useEffect, useState} from 'react'
import type {Analytics, SummaryAnalytics} from '../types/analytics'
import type {DetailedStats} from '../types/stats'
import {useStats} from './useStats'
import {useUrls} from './useUrls'

export const useStatsModal = (shortCode: string) => {
	const {loading, error, getDetailedStats, getAnalytics} = useStats()
	const [detailedStats, setDetailedStats] = useState<DetailedStats | null>(null)
	const [analytics, setAnalytics] = useState<Analytics | null>(null)

	useEffect(() => {
		const loadStats = async () => {
			const [detailedData, analyticsData] = await Promise.all([
				getDetailedStats(shortCode),
				getAnalytics(shortCode),
			])

			if (detailedData) setDetailedStats(detailedData)
			if (analyticsData) setAnalytics(analyticsData)
		}

		loadStats()
	}, [shortCode, getDetailedStats, getAnalytics])

	return {
		loading,
		error,
		detailedStats,
		analytics,
	}
}

export const useSummaryAnalytics = () => {
	const {loading, error, getSummaryAnalytics} = useStats()
	const [summaryData, setSummaryData] = useState<SummaryAnalytics[]>([])

	useEffect(() => {
		const loadSummary = async () => {
			const data = await getSummaryAnalytics()
			setSummaryData(data)
		}

		loadSummary()
	}, [getSummaryAnalytics])

	return {
		loading,
		error,
		summaryData,
	}
}

export const useDataLoader = <T>(
	loadFn: () => Promise<T>,
	deps: React.DependencyList,
	initialData?: T,
) => {
	const [data, setData] = useState<T | undefined>(initialData)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const loadData = async () => {
			setLoading(true)
			setError(null)

			try {
				const result = await loadFn()
				setData(result)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Произошла ошибка')
			} finally {
				setLoading(false)
			}
		}

		loadData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps)

	return {data, loading, error}
}

export const useUrlsLoader = () => {
	const {loading, error, refetch} = useUrls()

	useEffect(() => {
		refetch()
	}, [refetch])

	return {loading, error}
}
