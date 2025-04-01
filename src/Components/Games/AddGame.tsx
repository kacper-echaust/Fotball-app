import { useForm } from 'react-hook-form'
import { GameFormType, SingleAddGameType, SingleGameType } from '../../types'
import { StyledButton } from '../ui/StyledButton/StyledButton'
import { GameForm } from './GameForm'
import { usePostApi } from '../../hooks/usePostApi'
import styled from 'styled-components'

const Container = styled.div`
	position: fixed;
	right:20%;
	top:20%;
`

const AddGame = () => {
	const { mutateAsync: handleAddGame } = usePostApi<SingleGameType, SingleAddGameType>('games')
	const gameForm = useForm<GameFormType>()

	const onSubmit = async (data: GameFormType) => {
		const { title, date, location, duration, score, teamGame } = data
		handleAddGame({
			title,
			date,
			location,
			duration: `${duration} min`,
			score,
			team1Id: teamGame[0].id,
			team2Id: teamGame[1].id,
		})
	}
	return (
		<Container>
			<GameForm gameForm={gameForm} handleSubmitGame={onSubmit}>
				<StyledButton>Dodaj Rozgrywkę</StyledButton>
			</GameForm>
		</Container>
	)
}

export { AddGame }
