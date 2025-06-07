import {useState} from 'react'
import {StatsModal} from '../components/StatsModal'
import {SummaryAnalyticsView} from '../components/SummaryAnalytics'
import {UrlForm} from '../components/UrlForm'
import {UrlList} from '../components/UrlList'
import {useUrls} from '../hooks/useUrls'

export const HomePage = () => {
	const {urls, loading, error, createUrl, deleteUrl} = useUrls()
	const [selectedShortCode, setSelectedShortCode] = useState<string | null>(
		null,
	)
	const [activeView, setActiveView] = useState<'urls' | 'analytics'>('urls')

	const handleViewStats = (shortCode: string) => {
		setSelectedShortCode(shortCode)
	}

	const closeStatsModal = () => {
		setSelectedShortCode(null)
	}

	return (
		<div className='home-page'>
			<header className='page-header'>
				<h1>Сокращатель ссылок</h1>
				<p>Создавайте короткие ссылки и отслеживайте статистику</p>
			</header>

			<nav className='view-switcher'>
				<button
					className={activeView === 'urls' ? 'active' : ''}
					onClick={() => setActiveView('urls')}
				>
					Мои ссылки
				</button>
				<button
					className={activeView === 'analytics' ? 'active' : ''}
					onClick={() => setActiveView('analytics')}
				>
					Общая аналитика
				</button>
			</nav>

			{activeView === 'urls' && (
				<>
					<section className='create-section'>
						<h2>Создать новую короткую ссылку</h2>
						<UrlForm onSubmit={createUrl} loading={loading} />
						{error && <div className='error-message'>{error}</div>}
					</section>

					<section className='urls-section'>
						<h2>Созданные ссылки ({urls.length})</h2>
						<UrlList
							urls={urls}
							onDelete={deleteUrl}
							onViewStats={handleViewStats}
							loading={loading}
						/>
					</section>
				</>
			)}

			{activeView === 'analytics' && (
				<section className='analytics-section'>
					<SummaryAnalyticsView />
				</section>
			)}

			{selectedShortCode && (
				<StatsModal shortCode={selectedShortCode} onClose={closeStatsModal} />
			)}
		</div>
	)
}
