import { useForm, SubmitHandler } from 'react-hook-form'
import { usePostApi } from '../../../hooks/usePostApi'
import { SinglePlayerType, SingleAddPlayerType } from '../../../types'
import { FormPlayer } from '../FormPlayer/FormPlayer'

const AddPlayer = () => {
	const { mutateAsync } = usePostApi<SinglePlayerType, SingleAddPlayerType>('players')
	const formPlayer = useForm<SingleAddPlayerType>()

	const onSubmit: SubmitHandler<SingleAddPlayerType> = (data, event) => {
		if (event) event.preventDefault()
		mutateAsync({ ...data, teamId: Number(data.teamId) })
		formPlayer.reset()
	}
	return <FormPlayer formPlayer={formPlayer} onSubmit={onSubmit} submitButtonText='Dodaj zawodnika' />
}

export { AddPlayer }
