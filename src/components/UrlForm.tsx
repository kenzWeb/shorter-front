import React from 'react'
import type {CreateUrlRequest} from '../types/api'
import type {UrlData} from '../types/url'
import {useFormValidation} from '../hooks/useForm'
import {isValidAlias, isValidUrl} from '../utils/validation'

interface UrlFormProps {
	onSubmit: (data: CreateUrlRequest) => Promise<UrlData>
	loading: boolean
}

export const UrlForm = ({onSubmit, loading}: UrlFormProps) => {
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
				const date = new Date(value)
				if (date <= new Date()) {
					return 'Дата истечения должна быть в будущем'
				}
			}
			return null
		}
	}

	const {
		values,
		errors,
		setValue,
		setFieldTouched,
		validateAll,
		resetForm
	} = useFormValidation(
		{ originalUrl: '', alias: '', expiresAt: '' },
		validators
	)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!validateAll()) return

		const data: CreateUrlRequest = {
			originalUrl: values.originalUrl.trim(),
			...(values.alias.trim() && {alias: values.alias.trim()}),
			...(values.expiresAt && {expiresAt: new Date(values.expiresAt).toISOString()}),
		}

		try {
			await onSubmit(data)
			resetForm()
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
					value={values.originalUrl}
					onChange={(e) => setValue('originalUrl', e.target.value)}
					onBlur={() => setFieldTouched('originalUrl')}
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
					value={values.alias}
					onChange={(e) => setValue('alias', e.target.value)}
					onBlur={() => setFieldTouched('alias')}
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
					value={values.expiresAt}
					onChange={(e) => setValue('expiresAt', e.target.value)}
					onBlur={() => setFieldTouched('expiresAt')}
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
