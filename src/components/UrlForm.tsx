import {useState} from 'react'
import type {CreateUrlRequest} from '../types/api'
import type {UrlData} from '../types/url'
import {hasErrors, validateForm as validateFormData} from '../utils/forms'
import {isValidAlias, isValidUrl} from '../utils/validation'

interface UrlFormProps {
	onSubmit: (data: CreateUrlRequest) => Promise<UrlData>
	loading: boolean
}

export const UrlForm = ({onSubmit, loading}: UrlFormProps) => {
	const [originalUrl, setOriginalUrl] = useState('')
	const [alias, setAlias] = useState('')
	const [expiresAt, setExpiresAt] = useState('')
	const [errors, setErrors] = useState<Record<string, string>>({})

	const validateForm = (): boolean => {
		const formData = {originalUrl, alias, expiresAt}
		const validators = {
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
					const expirationDate = new Date(value)
					if (expirationDate <= new Date()) {
						return 'Дата истечения должна быть в будущем'
					}
				}
				return null
			},
		}

		const newErrors = validateFormData(formData, validators)
		setErrors(newErrors)
		return !hasErrors(newErrors)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!validateForm()) return

		const data: CreateUrlRequest = {
			originalUrl: originalUrl.trim(),
			...(alias.trim() && {alias: alias.trim()}),
			...(expiresAt && {expiresAt: new Date(expiresAt).toISOString()}),
		}

		try {
			await onSubmit(data)
			setOriginalUrl('')
			setAlias('')
			setExpiresAt('')
			setErrors({})
		} catch (error) {
			console.error('Ошибка при создании ссылки:', error)
		}
	}

	return (
		<form onSubmit={handleSubmit} className='url-form'>
			<div className='form-group'>
				<label htmlFor='originalUrl'>URL *</label>
				<input
					id='originalUrl'
					type='url'
					value={originalUrl}
					onChange={(e) => setOriginalUrl(e.target.value)}
					placeholder='https://example.com'
					className={errors.originalUrl ? 'error' : ''}
					disabled={loading}
				/>
				{errors.originalUrl && (
					<span className='error-text'>{errors.originalUrl}</span>
				)}
			</div>

			<div className='form-group'>
				<label htmlFor='alias'>Алиас (опционально)</label>
				<input
					id='alias'
					type='text'
					value={alias}
					onChange={(e) => setAlias(e.target.value)}
					placeholder='my-custom-alias'
					maxLength={20}
					className={errors.alias ? 'error' : ''}
					disabled={loading}
				/>
				{errors.alias && <span className='error-text'>{errors.alias}</span>}
			</div>

			<div className='form-group'>
				<label htmlFor='expiresAt'>Дата истечения (опционально)</label>
				<input
					id='expiresAt'
					type='datetime-local'
					value={expiresAt}
					onChange={(e) => setExpiresAt(e.target.value)}
					className={errors.expiresAt ? 'error' : ''}
					disabled={loading}
				/>
				{errors.expiresAt && (
					<span className='error-text'>{errors.expiresAt}</span>
				)}
			</div>

			<button type='submit' disabled={loading} className='submit-button'>
				{loading ? 'Создание...' : 'Создать короткую ссылку'}
			</button>
		</form>
	)
}
