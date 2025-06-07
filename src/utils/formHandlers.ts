import type {CreateUrlRequest, UrlData} from '../types'

export const createHandleSubmit = (
	validateAll: () => boolean,
	getFormData: () => {originalUrl: string; alias: string; expiresAt: string},
	onSubmit: (data: CreateUrlRequest) => Promise<UrlData>,
	resetForm: () => void,
) => {
	return async (e: React.FormEvent) => {
		e.preventDefault()

		if (!validateAll()) return

		const values = getFormData()
		const data: CreateUrlRequest = {
			originalUrl: values.originalUrl.trim(),
			...(values.alias.trim() && {alias: values.alias.trim()}),
			...(values.expiresAt && {
				expiresAt: new Date(values.expiresAt).toISOString(),
			}),
		}

		try {
			await onSubmit(data)
			resetForm()
		} catch (error) {
			console.error('Ошибка при создании ссылки:', error)
		}
	}
}

export const useSubmitHandler = (
	validateAll: () => boolean,
	getFormData: () => {originalUrl: string; alias: string; expiresAt: string},
	onSubmit: (data: CreateUrlRequest) => Promise<UrlData>,
	resetForm: () => void,
) => {
	const handleSubmit = createHandleSubmit(
		validateAll,
		getFormData,
		onSubmit,
		resetForm,
	)
	return {handleSubmit}
}
