import {useEffect, useState} from 'react'
import {useStats} from '../hooks/useStats'
import type {SummaryAnalytics} from '../types'
import {formatDate} from '../utils/helpers'

export const SummaryAnalyticsView = () => {
	const {loading, error, getSummaryAnalytics} = useStats()
	const [summaryData, setSummaryData] = useState<SummaryAnalytics[]>([])

	useEffect(() => {
		const loadSummary = async () => {
			const data = await getSummaryAnalytics()
			setSummaryData(data)
		}

		loadSummary()
	}, [getSummaryAnalytics])

	if (loading) {
		return <div className='loading'>Загрузка аналитики...</div>
	}

	if (error) {
		return <div className='error'>{error}</div>
	}

	if (summaryData.length === 0) {
		return <div className='empty-state'>Нет данных для аналитики</div>
	}

	const totalClicks = summaryData.reduce(
		(sum, item) => sum + item.totalClicks,
		0,
	)
	const totalUniqueVisitors = summaryData.reduce(
		(sum, item) => sum + item.uniqueVisitors,
		0,
	)
	const totalClicks24h = summaryData.reduce(
		(sum, item) => sum + item.clicksLast24h,
		0,
	)

	return (
		<div className='summary-analytics'>
			<h2>Общая аналитика</h2>

			<div className='summary-stats'>
				<div className='stat-card'>
					<h3>Всего ссылок</h3>
					<span className='stat-value'>{summaryData.length}</span>
				</div>
				<div className='stat-card'>
					<h3>Всего кликов</h3>
					<span className='stat-value'>{totalClicks}</span>
				</div>
				<div className='stat-card'>
					<h3>Уникальных посетителей</h3>
					<span className='stat-value'>{totalUniqueVisitors}</span>
				</div>
				<div className='stat-card'>
					<h3>Кликов за 24ч</h3>
					<span className='stat-value'>{totalClicks24h}</span>
				</div>
			</div>

			<div className='analytics-table'>
				<h3>Детализация по ссылкам</h3>
				<div className='table-header'>
					<span>Код</span>
					<span>URL</span>
					<span>Всего кликов</span>
					<span>Уникальных</span>
					<span>За 24ч</span>
					<span>Создано</span>
				</div>
				{summaryData.map((item) => (
					<div key={item.shortCode} className='table-row'>
						<span className='short-code'>{item.shortCode}</span>
						<span className='url' title={item.originalUrl}>
							{item.originalUrl.length > 40
								? `${item.originalUrl.substring(0, 40)}...`
								: item.originalUrl}
						</span>
						<span>{item.totalClicks}</span>
						<span>{item.uniqueVisitors}</span>
						<span>{item.clicksLast24h}</span>
						<span>{formatDate(item.createdAt)}</span>
					</div>
				))}
			</div>
		</div>
	)
}
