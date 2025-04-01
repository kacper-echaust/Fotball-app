import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from './useApi'

interface Identifiable {
	id: number
}

const useDeleteApi = <T extends Identifiable>(mutationKey: string) => {
	const queryClient = useQueryClient()
	const { apiDelete } = useApi()

	const { mutate } = useMutation<T, Error, number>({
		mutationKey: [mutationKey],
		mutationFn: async (id: number) => apiDelete(mutationKey, id),
		onSuccess: deletedData => {
			queryClient.setQueryData<T[]>([mutationKey], oldData => {
				console.log(`Dane do usunięcia: ${deletedData}`)
				console.log(`Stare dane: ${oldData}`)
				return oldData ? oldData.filter(element => element.id !== deletedData.id) : []
			})
		},
	})

	return {
		mutate,
	}
}

export { useDeleteApi }
