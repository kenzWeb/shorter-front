import {isValidAlias, isValidUrl} from './validation'

export const urlFormValidators = {
	originalUrl: (value: string) => {
		if (!value.trim()) return 'URL обязателен для заполнения'
		if (!isValidUrl(value)) return 'Некорректный URL'
		return null
	},
	alias: (value: string) => {
		if (value && !isValidAlias(value)) {
			return 'Алиас может содержать только буквы, цифры, дефисы и подчеркивания (макс. 20 символов)'
		}
		return null
	},
	expiresAt: (value: string) => {
		if (value) {
			const date = new Date(value)
			if (date <= new Date()) {
				return 'Дата истечения должна быть в будущем'
			}
		}
		return null
	},
}
