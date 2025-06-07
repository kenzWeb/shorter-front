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
					iconBg: '#fee2e2',
					iconColor: '#dc2626',
					confirmBg: '#dc2626',
					confirmHover: '#b91c1c',
				}
			case 'warning':
				return {
					iconBg: '#fef3c7',
					iconColor: '#d97706',
					confirmBg: '#d97706',
					confirmHover: '#b45309',
				}
			case 'info':
				return {
					iconBg: '#dbeafe',
					iconColor: '#2563eb',
					confirmBg: '#2563eb',
					confirmHover: '#1d4ed8',
				}
			default:
				return {
					iconBg: '#fee2e2',
					iconColor: '#dc2626',
					confirmBg: '#dc2626',
					confirmHover: '#b91c1c',
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
		<>
			{/* Добавляем CSS анимацию для спиннера */}
			<style>{`
				@keyframes spin {
					from { transform: rotate(0deg); }
					to { transform: rotate(360deg); }
				}
				.spinner {
					animation: spin 1s linear infinite;
				}
			`}</style>

			<div
				onClick={handleBackdropClick}
				onKeyDown={handleKeyDown}
				role='dialog'
				aria-modal='true'
				aria-labelledby='modal-title'
				aria-describedby='modal-description'
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: 9999,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					padding: '1rem',
				}}
			>
				<div
					style={{
						backgroundColor: 'white',
						borderRadius: '8px',
						boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
						maxWidth: '500px',
						width: '100%',
						maxHeight: '90vh',
						overflow: 'auto',
						position: 'relative',
						transform: 'scale(1)',
						transition: 'transform 0.2s ease-out',
					}}
					onClick={(e) => e.stopPropagation()}
				>
					<div style={{padding: '1.5rem'}}>
						<div
							style={{display: 'flex', alignItems: 'flex-start', gap: '1rem'}}
						>
							<div style={{flex: 1, minWidth: 0}}>
								<h3
									id='modal-title'
									style={{
										margin: 0,
										fontSize: '1.125rem',
										fontWeight: '600',
										color: '#111827',
										marginBottom: '0.5rem',
									}}
								>
									{title}
								</h3>
								<p
									id='modal-description'
									style={{
										margin: 0,
										fontSize: '0.875rem',
										color: '#6b7280',
										lineHeight: '1.5',
									}}
								>
									{message}
								</p>
							</div>
						</div>
					</div>

					<div
						style={{
							backgroundColor: '#f9fafb',
							padding: '1rem 1.5rem',
							display: 'flex',
							justifyContent: 'flex-end',
							gap: '0.75rem',
							borderTop: '1px solid #e5e7eb',
							borderBottomLeftRadius: '8px',
							borderBottomRightRadius: '8px',
						}}
					>
						<button
							type='button'
							onClick={onCancel}
							disabled={loading}
							style={{
								padding: '0.5rem 1rem',
								fontSize: '0.875rem',
								fontWeight: '500',
								backgroundColor: 'white',
								color: '#374151',
								border: '1px solid #d1d5db',
								borderRadius: '6px',
								cursor: loading ? 'not-allowed' : 'pointer',
								opacity: loading ? 0.6 : 1,
								transition: 'all 0.2s',
							}}
							onMouseEnter={(e) => {
								if (!loading) {
									e.currentTarget.style.backgroundColor = '#f9fafb'
								}
							}}
							onMouseLeave={(e) => {
								if (!loading) {
									e.currentTarget.style.backgroundColor = 'white'
								}
							}}
						>
							{cancelText}
						</button>

						<button
							type='button'
							onClick={onConfirm}
							disabled={loading}
							style={{
								padding: '0.5rem 1rem',
								fontSize: '0.875rem',
								fontWeight: '500',
								color: 'white',
								border: 'none',
								borderRadius: '6px',
								cursor: loading ? 'not-allowed' : 'pointer',
								opacity: loading ? 0.8 : 1,
								transition: 'all 0.2s',
								display: 'flex',
								alignItems: 'center',
								gap: '0.5rem',
								backgroundColor: styles.confirmBg,
							}}
							onMouseEnter={(e) => {
								if (!loading) {
									e.currentTarget.style.backgroundColor = styles.confirmHover
								}
							}}
							onMouseLeave={(e) => {
								if (!loading) {
									e.currentTarget.style.backgroundColor = styles.confirmBg
								}
							}}
						>
							{loading && (
								<div
									className='spinner'
									style={{
										width: '16px',
										height: '16px',
										border: '2px solid rgba(255, 255, 255, 0.3)',
										borderTopColor: 'white',
										borderRadius: '50%',
									}}
								/>
							)}
							{loading ? 'Обработка...' : confirmText}
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default ConfirmModal
