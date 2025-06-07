import type {ReactNode} from 'react'

export interface LoadingStateProps {
	loading: boolean
	error: string | null
	children: ReactNode
	loadingText?: string
	errorPrefix?: string
}

export const LoadingState = ({
	loading,
	error,
	children,
	loadingText = 'Загрузка...',
	errorPrefix = 'Ошибка:',
}: LoadingStateProps) => {
	if (loading) {
		return <div className='loading'>{loadingText}</div>
	}

	if (error) {
		return (
			<div className='error'>
				{errorPrefix} {error}
			</div>
		)
	}

	return <>{children}</>
}

export const EmptyState = ({message}: {message: string}) => (
	<div className='empty-state'>{message}</div>
)

export const UrlsLoadingState = ({
	loading,
	children,
}: {
	loading: boolean
	children: ReactNode
}) => (
	<LoadingState loading={loading} error={null} loadingText='Загрузка ссылок...'>
		{children}
	</LoadingState>
)

export const StatsLoadingState = ({
	loading,
	error,
	children,
}: {
	loading: boolean
	error: string | null
	children: ReactNode
}) => (
	<LoadingState
		loading={loading}
		error={error}
		loadingText='Загрузка статистики...'
	>
		{children}
	</LoadingState>
)

export const AnalyticsLoadingState = ({
	loading,
	error,
	children,
}: {
	loading: boolean
	error: string | null
	children: ReactNode
}) => (
	<LoadingState
		loading={loading}
		error={error}
		loadingText='Загрузка аналитики...'
	>
		{children}
	</LoadingState>
)

export const UrlsEmptyState = () => (
	<EmptyState message='Пока нет созданных ссылок' />
)

export const AnalyticsEmptyState = () => (
	<EmptyState message='Нет данных для аналитики' />
)
