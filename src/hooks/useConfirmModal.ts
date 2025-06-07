import {useCallback, useState} from 'react'
import type {ModalState} from '../types/modal'

interface ConfirmOptions {
	title?: string
	message: string
	confirmText?: string
	cancelText?: string
	variant?: 'danger' | 'warning' | 'info'
}

export const useConfirmModal = () => {
	const [modalState, setModalState] = useState<ModalState>({
		isOpen: false,
		title: '',
		message: '',
		confirmText: 'Подтвердить',
		cancelText: 'Отмена',
		variant: 'danger',
		loading: false,
	})

	const showConfirm = useCallback(
		(options: ConfirmOptions): Promise<boolean> => {
			return new Promise((resolve) => {
				setModalState({
					isOpen: true,
					title: options.title || 'Подтверждение действия',
					message: options.message,
					confirmText: options.confirmText || 'Подтвердить',
					cancelText: options.cancelText || 'Отмена',
					variant: options.variant || 'danger',
					loading: false,
					resolve,
				})
			})
		},
		[],
	)

	const handleConfirm = useCallback(() => {
		if (modalState.resolve) {
			modalState.resolve(true)
		}
		setModalState((prev) => ({...prev, isOpen: false, resolve: undefined}))
	}, [modalState.resolve])

	const handleCancel = useCallback(() => {
		if (modalState.resolve) {
			modalState.resolve(false)
		}
		setModalState((prev) => ({...prev, isOpen: false, resolve: undefined}))
	}, [modalState.resolve])

	const setLoading = useCallback((loading: boolean) => {
		setModalState((prev) => ({...prev, loading}))
	}, [])

	return {
		modalState,
		showConfirm,
		handleConfirm,
		handleCancel,
		setLoading,
	}
}
