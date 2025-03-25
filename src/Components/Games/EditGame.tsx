import { useForm } from 'react-hook-form'
import { useUpdateApi } from '../../hooks/useUpdateApi'
import { GameFormType, SingleAddGameType, SingleGameType } from '../../types'
import { StyledButton } from '../ui/StyledButton/StyledButton'
import styled from 'styled-components'
import { CompetitionsForm } from './GameForm'

type EditGameProps = {
	setEdit: React.Dispatch<React.SetStateAction<boolean>>
	game: SingleGameType
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
	z-index: 2;
`
const EditGame = ({ setEdit, game }: EditGameProps) => {
	const { mutateAsync: handleUpdateGame } = useUpdateApi<SingleGameType, SingleAddGameType>('games')
	const gameForm = useForm<GameFormType>({
		defaultValues: {
			title: game.title,
			date: game.date,
			location: game.location,
			duration: game.duration,
			score: game.score,
		},
	})
	const handleCancelEdit = () => {
		setEdit(false)
	}
	const onSubmit = async (data: GameFormType) => {
		const { title, date, location, duration, score, teamGame } = data
		await handleUpdateGame({
			id: game.id,
			data: {
				title,
				date,
				location,
				duration,
				score,
				team1Id: teamGame[0].id,
				team2Id: teamGame[1].id,
			},
		})
		setEdit(false)
	}

	return (
		<Container>
			<CompetitionsForm handleSubmitGame={onSubmit} gameForm={gameForm}>
				<StyledButton>Edytuj drużynę</StyledButton>
				<StyledButton onClick={handleCancelEdit}>Anuluj</StyledButton>
			</CompetitionsForm>
		</Container>
	)
}

export { EditGame as EditCompetition }
