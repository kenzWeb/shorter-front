import {useState} from 'react'
import {hasErrors, validateForm} from '../utils/forms'

export const useFormValidation = <T extends Record<string, string>>(
	initialValues: T,
	validators: Record<keyof T, (value: string) => string | null>,
) => {
	const [values, setValues] = useState<T>(initialValues)
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [touched, setTouched] = useState<Record<string, boolean>>({})

	const setValue = (field: keyof T, value: string) => {
		setValues((prev) => ({...prev, [field]: value}))

		if (touched[field as string]) {
			const newErrors = validateForm(
				{[field]: value} as Record<string, string>,
				{[field]: validators[field]} as Record<
					string,
					(value: string) => string | null
				>,
			)
			setErrors((prev) => ({...prev, ...newErrors}))
		}
	}

	const setFieldTouched = (field: keyof T) => {
		setTouched((prev) => ({...prev, [field as string]: true}))
	}

	const validateAll = (): boolean => {
		const newErrors = validateForm(
			values as Record<string, string>,
			validators as Record<string, (value: string) => string | null>,
		)
		setErrors(newErrors)
		setTouched(
			Object.keys(values).reduce((acc, key) => ({...acc, [key]: true}), {}),
		)
		return !hasErrors(newErrors)
	}

	const resetForm = () => {
		setValues(initialValues)
		setErrors({})
		setTouched({})
	}

	return {
		values,
		errors,
		touched,
		setValue,
		setFieldTouched,
		validateAll,
		resetForm,
		isValid: !hasErrors(errors),
	}
}
