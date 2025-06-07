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
