import {useState} from 'react'
import {copyToClipboard} from './browser'

export const useCopyHandler = () => {
	const [copySuccess, setCopySuccess] = useState<string | null>(null)

	const handleCopy = async (url: string, identifier: string) => {
		const success = await copyToClipboard(url)
		if (success) {
			setCopySuccess(identifier)
			setTimeout(() => setCopySuccess(null), 2000)
		}
		return success
	}

	return {copySuccess, handleCopy}
}

export const useDeleteHandler = () => {
	const [deleteLoading, setDeleteLoading] = useState<string | null>(null)

	const handleDelete = async (
		identifier: string,
		deleteFn: (id: string) => Promise<void>,
		confirmMessage?: string,
	) => {
		const message =
			confirmMessage || 'Вы уверены, что хотите удалить этот элемент?'
		if (!confirm(message)) return false

		setDeleteLoading(identifier)
		try {
			await deleteFn(identifier)
			return true
		} catch (error) {
			console.error('Ошибка при удалении:', error)
			return false
		} finally {
			setDeleteLoading(null)
		}
	}

	return {deleteLoading, handleDelete}
}

export const useAsyncAction = () => {
	const [loading, setLoading] = useState<string | null>(null)

	const executeAction = async <T>(
		identifier: string,
		action: () => Promise<T>,
	): Promise<T | null> => {
		setLoading(identifier)
		try {
			const result = await action()
			return result
		} catch (error) {
			console.error('Ошибка при выполнении действия:', error)
			return null
		} finally {
			setLoading(null)
		}
	}

	return {loading, executeAction}
}
