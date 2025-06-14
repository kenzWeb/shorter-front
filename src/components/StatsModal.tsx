import {useState} from 'react'
import {useKeyboardHandler, useModalBodyClass} from '../hooks/common'
import {useStatsModal} from '../hooks/useEffects'
import {truncateUserAgent} from '../utils/analytics'
import {formatDate} from '../utils/dateFormat'
import {StatsLoadingState} from './common/LoadingState'

interface StatsModalProps {
	shortCode: string
	onClose: () => void
}

export const StatsModal = ({shortCode, onClose}: StatsModalProps) => {
	const {loading, error, detailedStats, analytics} = useStatsModal(shortCode)
	const [activeTab, setActiveTab] = useState<'detailed' | 'analytics'>(
		'detailed',
	)

	useKeyboardHandler('Escape', onClose)
	useModalBodyClass(true)

	return (
		<div className='modal-overlay' onClick={onClose}>
			<div className='modal-content' onClick={(e) => e.stopPropagation()}>
				<div className='modal-header'>
					<h2>Статистика для {shortCode}</h2>
					<button onClick={onClose} className='close-button'>
						×
					</button>
				</div>

				<div className='stats-tabs'>
					<button
						className={activeTab === 'detailed' ? 'tab active' : 'tab'}
						onClick={() => setActiveTab('detailed')}
					>
						Детальная статистика
					</button>
					<button
						className={activeTab === 'analytics' ? 'tab active' : 'tab'}
						onClick={() => setActiveTab('analytics')}
					>
						Аналитика
					</button>
				</div>

				<StatsLoadingState loading={loading} error={error}>
					{activeTab === 'detailed' && detailedStats ? (
						<div className='detailed-stats'>
							<div className='stats-summary'>
								<h3>Основная информация</h3>
								<p>
									<strong>URL:</strong> {detailedStats.url.originalUrl}
								</p>
								<p>
									<strong>Создано:</strong>{' '}
									{formatDate(detailedStats.url.createdAt)}
								</p>
								<p>
									<strong>Всего кликов:</strong> {detailedStats.url.clickCount}
								</p>
							</div>

							<div className='click-history'>
								<h3>История кликов</h3>
								{detailedStats.statistics.length === 0 ? (
									<p>Пока нет кликов по этой ссылке</p>
								) : (
									<div className='clicks-table'>
										<div className='table-header'>
											<span>Время</span>
											<span>IP адрес</span>
											<span>User Agent</span>
										</div>
										{detailedStats.statistics.map((stat, index) => (
											<div key={index} className='table-row'>
												<span>{formatDate(stat.clickedAt)}</span>
												<span>{stat.ipAddress}</span>
												<span title={stat.userAgent}>
													{truncateUserAgent(stat.userAgent)}
												</span>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					) : activeTab === 'analytics' && analytics ? (
						<div className='analytics'>
							<div className='analytics-summary'>
								<h3>Аналитические данные</h3>
								<p>
									<strong>URL:</strong> {analytics.originalUrl}
								</p>
								<p>
									<strong>Создано:</strong> {formatDate(analytics.createdAt)}
								</p>
								<p>
									<strong>Всего кликов:</strong> {analytics.clickCount}
								</p>
							</div>

							<div className='ip-list'>
								<h3>Последние 5 IP адресов</h3>
								{analytics.lastFiveIPs.length === 0 ? (
									<p>Нет данных об IP адресах</p>
								) : (
									<ul>
										{analytics.lastFiveIPs.map((ip, index) => (
											<li key={index}>{ip}</li>
										))}
									</ul>
								)}
							</div>
						</div>
					) : null}
				</StatsLoadingState>
			</div>
		</div>
	)
}
