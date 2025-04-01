import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useUpdateApi } from '../../hooks/useUpdateApi'
import { SingleAddPlayerType } from '../../types'
import { StyledButton } from '../ui/StyledButton/StyledButton'
import { FormPlayer } from './FormPlayer'

type Props = {
	id: number
	firstName: string
	lastName: string
	teamId: number
	closeEdit: () => void
}

const Container = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	background-color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	top: 0;
	left: 0;
`

const EditPlayer = ({ id, firstName, lastName, teamId, closeEdit }: Props) => {
	const { mutateAsync } = useUpdateApi('players')
	const formPlayer = useForm<SingleAddPlayerType>({
		defaultValues: {
			firstName,
			lastName,
			teamId,
		},
	})

	const onSubmit = (data: SingleAddPlayerType) => {
		mutateAsync({ id: id.toString(), data })
		closeEdit()
	}

	return (
		<Container>
			<FormPlayer formPlayer={formPlayer} onSubmit={onSubmit} submitButtonText='Potwierdź zmianę' />
			<StyledButton onClick={closeEdit}>Anuluj</StyledButton>
		</Container>
	)
}

export { EditPlayer }
