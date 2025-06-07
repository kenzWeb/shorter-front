export type ModalVariant = 'danger' | 'warning' | 'info'

export interface VariantStyles {
	iconBg: string
	iconColor: string
	confirmBg: string
	confirmHover: string
}

export const getVariantStyles = (
	variant: ModalVariant = 'danger',
): VariantStyles => {
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

export const modalStyles = {
	backdrop: {
		position: 'fixed' as const,
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
	},
	modal: {
		backgroundColor: 'white',
		borderRadius: '8px',
		boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
		maxWidth: '500px',
		width: '100%',
		maxHeight: '90vh',
		overflow: 'auto' as const,
		position: 'relative' as const,
		transform: 'scale(1)',
		transition: 'transform 0.2s ease-out',
	},
	content: {
		padding: '1.5rem',
	},
	contentFlex: {
		display: 'flex',
		alignItems: 'flex-start',
		gap: '1rem',
	},
	textContainer: {
		flex: 1,
		minWidth: 0,
	},
	title: {
		margin: 0,
		fontSize: '1.125rem',
		fontWeight: '600' as const,
		color: '#111827',
		marginBottom: '0.5rem',
	},
	message: {
		margin: 0,
		fontSize: '0.875rem',
		color: '#6b7280',
		lineHeight: '1.5',
	},
	footer: {
		backgroundColor: '#f9fafb',
		padding: '1rem 1.5rem',
		display: 'flex',
		justifyContent: 'flex-end',
		gap: '0.75rem',
		borderTop: '1px solid #e5e7eb',
		borderBottomLeftRadius: '8px',
		borderBottomRightRadius: '8px',
	},
	cancelButton: {
		padding: '0.5rem 1rem',
		fontSize: '0.875rem',
		fontWeight: '500' as const,
		backgroundColor: 'white',
		color: '#374151',
		border: '1px solid #d1d5db',
		borderRadius: '6px',
		transition: 'all 0.2s',
	},
	confirmButton: {
		padding: '0.5rem 1rem',
		fontSize: '0.875rem',
		fontWeight: '500' as const,
		color: 'white',
		border: 'none',
		borderRadius: '6px',
		transition: 'all 0.2s',
		display: 'flex',
		alignItems: 'center',
		gap: '0.5rem',
	},
	spinner: {
		width: '16px',
		height: '16px',
		border: '2px solid rgba(255, 255, 255, 0.3)',
		borderTopColor: 'white',
		borderRadius: '50%',
	},
}
