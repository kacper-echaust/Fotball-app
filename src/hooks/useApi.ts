const BASE_URL = import.meta.env.VITE_API_BASE_URL
const useApi = () => {
	const call = async <R, P = object>(
		url: string,
		method: 'GET' | 'DELETE' | 'POST' | 'PUT',
		payload?: P
	): Promise<R> => {
		try {
			const response = await fetch(`${BASE_URL}${url}`, {
				method,
				headers: {
					'Content-type': 'application/json',
				},
				body: payload ? JSON.stringify(payload) : undefined,
			})
			if (response.ok) {
				const data: R = await response.json()
				return data
			} else {
				const error: string = await response.text()
				throw new Error(error)
			}
		} catch (error) {
			throw new Error('Wystąpił błąd')
		}
	}
	const apiGet = async <R>(url: string) => {
		return await call<R>(url, 'GET')
	}
	const apiPost = async <R, P>(url: string, payload: P) => {
		return await call<R, P>(url, 'POST', payload)
	}
	const apiDelete = async <R>(url: string, id: number) => {
		return await call<R>(`${url}/${id}`, 'DELETE')
	}
	const apiPut = async <R, P>(url: string, id: number, payload: P) => {
		return await call<R, P>(`${url}/${id}`, 'PUT', payload)
	}
	return {
		apiGet,
		apiPost,
		apiDelete,
		apiPut,
	}
}

export { useApi }
