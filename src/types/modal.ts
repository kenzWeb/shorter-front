export interface ConfirmModalProps {
	isOpen: boolean
	title: string
	message: string
	confirmText?: string
	cancelText?: string
	variant?: 'danger' | 'warning' | 'info'
	loading?: boolean
	onConfirm: () => void
	onCancel: () => void
}

export interface ModalState {
	isOpen: boolean
	title: string
	message: string
	confirmText: string
	cancelText: string
	variant: 'danger' | 'warning' | 'info'
	loading: boolean
	resolve?: (confirmed: boolean) => void
}
