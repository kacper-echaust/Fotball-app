import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useApi } from './useApi'

const usePostApi = <TResponse, TRequest>(mutationKey: string) => {
	const queryClient = useQueryClient()
	const { apiPost } = useApi()

	const { mutateAsync } = useMutation<TResponse, Error, TRequest>({
		mutationKey: [mutationKey],
		mutationFn: async (data: TRequest) => await apiPost<TResponse, TRequest>(mutationKey, data),
		onSuccess: data => {
			queryClient.setQueryData<TResponse[]>([mutationKey], oldData => {
				return [...(oldData || []), data]
			})
		},
	})

	return { mutateAsync }
}
export { usePostApi }
