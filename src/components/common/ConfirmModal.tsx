import React from 'react'
import {useModalBodyClass} from '../../hooks/common'
import type {ConfirmModalProps} from '../../types/modal'
import {
	createButtonHandlers,
	createModalHandlers,
} from '../../utils/modalHandlers'
import {getVariantStyles, modalStyles} from '../../utils/modalStyles'

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

	const styles = getVariantStyles(variant)
	const {handleBackdropClick, handleKeyDown, handleStopPropagation} =
		createModalHandlers(onConfirm, onCancel, loading)
	const {cancelButtonHandlers, confirmButtonHandlers} = createButtonHandlers(
		styles,
		loading,
	)

	return (
		<>
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
				style={modalStyles.backdrop}
			>
				<div style={modalStyles.modal} onClick={handleStopPropagation}>
					<div style={modalStyles.content}>
						<div style={modalStyles.contentFlex}>
							<div style={modalStyles.textContainer}>
								<h3 id='modal-title' style={modalStyles.title}>
									{title}
								</h3>
								<p id='modal-description' style={modalStyles.message}>
									{message}
								</p>
							</div>
						</div>
					</div>

					<div style={modalStyles.footer}>
						<button
							type='button'
							onClick={onCancel}
							disabled={loading}
							style={{
								...modalStyles.cancelButton,
								cursor: loading ? 'not-allowed' : 'pointer',
								opacity: loading ? 0.6 : 1,
							}}
							{...cancelButtonHandlers}
						>
							{cancelText}
						</button>

						<button
							type='button'
							onClick={onConfirm}
							disabled={loading}
							style={{
								...modalStyles.confirmButton,
								cursor: loading ? 'not-allowed' : 'pointer',
								opacity: loading ? 0.8 : 1,
								backgroundColor: styles.confirmBg,
							}}
							{...confirmButtonHandlers}
						>
							{loading && (
								<div className='spinner' style={modalStyles.spinner} />
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
