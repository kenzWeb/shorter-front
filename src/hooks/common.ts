import {useEffect} from 'react'

export const useKeyboardHandler = (key: string, handler: () => void) => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === key) {
				handler()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [key, handler])
}

export const useModalBodyClass = (
	isOpen: boolean,
	className: string = 'modal-open',
) => {
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add(className)
		}

		return () => {
			document.body.classList.remove(className)
		}
	}, [isOpen, className])
}

export const useAsyncEffect = (
	asyncFn: () => Promise<void>,
	deps: React.DependencyList,
) => {
	useEffect(() => {
		asyncFn()
	}, deps)
}
