import {useSummaryAnalytics} from '../hooks/useEffects'
import {calculateAnalyticsTotals, truncateUrl} from '../utils/analytics'
import {formatDate} from '../utils/dateFormat'
import {EmptyState, LoadingState} from './common/LoadingState'

export const SummaryAnalyticsView = () => {
	const {loading, error, summaryData} = useSummaryAnalytics()

	const totals = calculateAnalyticsTotals(summaryData)

	return (
		<LoadingState
			loading={loading}
			error={error}
			loadingText='Загрузка аналитики...'
		>
			{summaryData.length === 0 ? (
				<EmptyState message='Нет данных для аналитики' />
			) : (
				<div className='summary-analytics'>
					<h2>Общая аналитика</h2>

					<div className='summary-stats'>
						<div className='stat-card'>
							<h3>Всего ссылок</h3>
							<span className='stat-value'>{totals.totalUrls}</span>
						</div>
						<div className='stat-card'>
							<h3>Всего кликов</h3>
							<span className='stat-value'>{totals.totalClicks}</span>
						</div>
						<div className='stat-card'>
							<h3>Уникальных посетителей</h3>
							<span className='stat-value'>{totals.totalUniqueVisitors}</span>
						</div>
						<div className='stat-card'>
							<h3>Кликов за 24ч</h3>
							<span className='stat-value'>{totals.totalClicks24h}</span>
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
									{truncateUrl(item.originalUrl)}
								</span>
								<span>{item.totalClicks}</span>
								<span>{item.uniqueVisitors}</span>
								<span>{item.clicksLast24h}</span>
								<span>{formatDate(item.createdAt)}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</LoadingState>
	)
}
