import {useState} from 'react'
import type {UrlData} from '../types'
import {copyToClipboard, formatDate} from '../utils/helpers'

interface UrlListProps {
	urls: UrlData[]
	onDelete: (shortCode: string) => Promise<void>
	onViewStats: (shortCode: string) => void
	loading: boolean
}

export const UrlList = ({
	urls,
	onDelete,
	onViewStats,
	loading,
}: UrlListProps) => {
	const [copySuccess, setCopySuccess] = useState<string | null>(null)
	const [deleteLoading, setDeleteLoading] = useState<string | null>(null)

	const handleCopy = async (url: string, shortCode: string) => {
		const success = await copyToClipboard(url)
		if (success) {
			setCopySuccess(shortCode)
			setTimeout(() => setCopySuccess(null), 2000)
		}
	}

	const handleDelete = async (shortCode: string) => {
		if (!confirm('Вы уверены, что хотите удалить эту ссылку?')) return

		setDeleteLoading(shortCode)
		try {
			await onDelete(shortCode)
		} catch (error) {
			console.error('Ошибка при удалении:', error)
		} finally {
			setDeleteLoading(null)
		}
	}

	if (loading) {
		return <div className='loading'>Загрузка ссылок...</div>
	}

	if (urls.length === 0) {
		return <div className='empty-state'>Пока нет созданных ссылок</div>
	}

	return (
		<div className='url-list'>
			{urls.map((url) => (
				<div key={url.id} className='url-item'>
					<div className='url-info'>
						<div className='url-main'>
							<a
								href={url.originalUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='original-url'
								title={url.originalUrl}
							>
								{url.originalUrl.length > 50
									? `${url.originalUrl.substring(0, 50)}...`
									: url.originalUrl}
							</a>
							<div className='short-url'>
								<span>{url.shortUrl}</span>
								<button
									onClick={() => handleCopy(url.shortUrl, url.shortCode)}
									className='copy-button'
									title='Копировать ссылку'
								>
									{copySuccess === url.shortCode ? '✓' : '📋'}
								</button>
							</div>
						</div>

						<div className='url-meta'>
							<span className='clicks'>Клики: {url.clickCount}</span>
							<span className='created'>
								Создано: {formatDate(url.createdAt)}
							</span>
							{url.expiresAt && (
								<span className='expires'>
									Истекает: {formatDate(url.expiresAt)}
								</span>
							)}
						</div>
					</div>

					<div className='url-actions'>
						<button
							onClick={() => onViewStats(url.shortCode)}
							className='stats-button'
						>
							Статистика
						</button>
						<button
							onClick={() => handleDelete(url.shortCode)}
							className='delete-button'
							disabled={deleteLoading === url.shortCode}
						>
							{deleteLoading === url.shortCode ? '...' : 'Удалить'}
						</button>
					</div>
				</div>
			))}
		</div>
	)
}
