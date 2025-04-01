import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from './useApi'

const useUpdateApi = <TResponse extends { id: string }, TRequest>(mutationKey: string) => {
	const queryClient = useQueryClient()
	const { apiPut } = useApi()

	const { mutateAsync } = useMutation<TResponse, Error, { id: string; data: TRequest }>({
		mutationKey: [mutationKey],
		mutationFn: async ({ id, data }) => await apiPut<TResponse, TRequest>(mutationKey, Number(id), data),
		onSuccess: updatedData => {
			queryClient.setQueryData<TResponse[]>([mutationKey], oldData => {
				return oldData ? oldData.map(item => (item.id === updatedData.id ? updatedData : item)) : []
			})
		},
	})

	return {
		mutateAsync,
	}
}

export { useUpdateApi }
