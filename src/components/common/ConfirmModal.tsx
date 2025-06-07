import React from 'react'
import {useModalBodyClass} from '../../hooks/common'
import type {ConfirmModalProps} from '../../types/modal'

const ConfirmModal: React.FC<ConfirmModalProps> = ({
	isOpen,
	title,
	message,
	confirmText = 'Подтвердить',
	cancelText = 'Отмена',
	variant = 'danger',
	loading = false,
	onConfirm,
	onCancel,
}) => {
	useModalBodyClass(isOpen)

	if (!isOpen) return null

	const getVariantStyles = () => {
		switch (variant) {
			case 'danger':
				return {
					icon: '⚠️',
					confirmButton:
						'bg-red-600 hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400',
					iconBg: 'bg-red-100',
					iconColor: 'text-red-600',
				}
			case 'warning':
				return {
					icon: '⚠️',
					confirmButton:
						'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 disabled:bg-yellow-400',
					iconBg: 'bg-yellow-100',
					iconColor: 'text-yellow-600',
				}
			case 'info':
				return {
					icon: 'ℹ️',
					confirmButton:
						'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-400',
					iconBg: 'bg-blue-100',
					iconColor: 'text-blue-600',
				}
			default:
				return {
					icon: '⚠️',
					confirmButton:
						'bg-red-600 hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400',
					iconBg: 'bg-red-100',
					iconColor: 'text-red-600',
				}
		}
	}

	const styles = getVariantStyles()

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

	return (
		<div
			className='fixed inset-0 z-50 overflow-y-auto'
			onClick={handleBackdropClick}
			onKeyDown={handleKeyDown}
			role='dialog'
			aria-modal='true'
			aria-labelledby='modal-title'
			aria-describedby='modal-description'
		>
			<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
				<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

				<div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
					<div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
						<div className='sm:flex sm:items-start'>
							<div
								className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${styles.iconBg} sm:mx-0 sm:h-10 sm:w-10`}
							>
								<span className='text-xl' aria-hidden='true'>
									{styles.icon}
								</span>
							</div>
							<div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
								<h3
									className='text-base font-semibold leading-6 text-gray-900'
									id='modal-title'
								>
									{title}
								</h3>
								<div className='mt-2'>
									<p className='text-sm text-gray-500' id='modal-description'>
										{message}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
						<button
							type='button'
							className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors sm:ml-3 sm:w-auto ${styles.confirmButton}`}
							onClick={onConfirm}
							disabled={loading}
						>
							{loading ? (
								<>
									<svg
										className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
									>
										<circle
											className='opacity-25'
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'
										></circle>
										<path
											className='opacity-75'
											fill='currentColor'
											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
										></path>
									</svg>
									Обработка...
								</>
							) : (
								confirmText
							)}
						</button>
						<button
							type='button'
							className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors sm:mt-0 sm:w-auto'
							onClick={onCancel}
							disabled={loading}
						>
							{cancelText}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ConfirmModal
