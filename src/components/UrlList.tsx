import type {UrlData} from '../types/url'
import {formatDate} from '../utils'
import {truncateUrl} from '../utils/analytics'
import {useCopyHandler, useDeleteHandler} from '../utils/handlers'

import {UrlsEmptyState, UrlsLoadingState} from './common/LoadingState'

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
	const {copySuccess, handleCopy} = useCopyHandler()
	const {deleteLoading, handleDelete} = useDeleteHandler()

	const onDeleteClick = (shortCode: string) => {
		handleDelete(
			shortCode,
			onDelete,
			'Вы уверены, что хотите удалить эту ссылку?',
		)
	}

	return (
		<UrlsLoadingState loading={loading}>
			{urls.length === 0 ? (
				<UrlsEmptyState />
			) : (
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
										{truncateUrl(url.originalUrl, 50)}
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
									onClick={() => onDeleteClick(url.shortCode)}
									className='delete-button'
									disabled={deleteLoading === url.shortCode}
								>
									{deleteLoading === url.shortCode ? '...' : 'Удалить'}
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</UrlsLoadingState>
	)
}
