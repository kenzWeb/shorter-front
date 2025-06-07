export const validateForm = (
	formData: Record<string, string>,
	validators: Record<string, (value: string) => string | null>,
): Record<string, string> => {
	const errors: Record<string, string> = {}

	Object.entries(formData).forEach(([field, value]) => {
		const validator = validators[field]
		if (validator) {
			const error = validator(value)
			if (error) {
				errors[field] = error
			}
		}
	})

	return errors
}

export const hasErrors = (errors: Record<string, string>): boolean => {
	return Object.keys(errors).length > 0
}
