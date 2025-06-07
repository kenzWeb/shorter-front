import {useEffect, useState} from 'react'
import {urlService} from '../services/api'
import type {CreateUrlRequest, UrlData} from '../types'

export const useUrls = () => {
	const [urls, setUrls] = useState<UrlData[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const fetchUrls = async () => {
		setLoading(true)
		setError(null)
		try {
			const data = await urlService.getAllUrls()
			setUrls(data)
		} catch {
			setError('Ошибка при загрузке ссылок')
		} finally {
			setLoading(false)
		}
	}

	const createUrl = async (urlData: CreateUrlRequest) => {
		setLoading(true)
		setError(null)
		try {
			const newUrl = await urlService.createShortUrl(urlData)
			setUrls((prev) => [newUrl, ...prev])
			return newUrl
		} catch (err: unknown) {
			let errorMessage = 'Ошибка при создании ссылки'
			if (err && typeof err === 'object' && 'response' in err) {
				const response = (err as {response?: {data?: {message?: string}}})
					.response
				if (response?.data?.message) {
					errorMessage = response.data.message
				}
			}
			setError(errorMessage)
			throw new Error(errorMessage)
		} finally {
			setLoading(false)
		}
	}

	const deleteUrl = async (shortCode: string) => {
		setLoading(true)
		setError(null)
		try {
			await urlService.deleteUrl(shortCode)
			setUrls((prev) => prev.filter((url) => url.shortCode !== shortCode))
		} catch (err) {
			setError('Ошибка при удалении ссылки')
			throw err
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchUrls()
	}, [])

	return {
		urls,
		loading,
		error,
		createUrl,
		deleteUrl,
		refetch: fetchUrls,
	}
}
