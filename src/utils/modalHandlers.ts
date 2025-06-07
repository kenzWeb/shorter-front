export const createModalHandlers = (
	onConfirm: () => void,
	onCancel: () => void,
	loading: boolean = false,
) => {
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onCancel()
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			onCancel()
		}
		if (e.key === 'Enter' && !loading) {
			onConfirm()
		}
	}

	const handleStopPropagation = (e: React.MouseEvent) => {
		e.stopPropagation()
	}

	return {
		handleBackdropClick,
		handleKeyDown,
		handleStopPropagation,
	}
}

export const createButtonHandlers = (
	styles: {confirmBg: string; confirmHover: string},
	loading: boolean = false,
) => {
	const createCancelButtonHandlers = () => ({
		onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
			if (!loading) {
				e.currentTarget.style.backgroundColor = '#f9fafb'
			}
		},
		onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
			if (!loading) {
				e.currentTarget.style.backgroundColor = 'white'
			}
		},
	})

	const createConfirmButtonHandlers = () => ({
		onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
			if (!loading) {
				e.currentTarget.style.backgroundColor = styles.confirmHover
			}
		},
		onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
			if (!loading) {
				e.currentTarget.style.backgroundColor = styles.confirmBg
			}
		},
	})

	return {
		cancelButtonHandlers: createCancelButtonHandlers(),
		confirmButtonHandlers: createConfirmButtonHandlers(),
	}
}
