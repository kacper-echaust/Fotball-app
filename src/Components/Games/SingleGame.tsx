import { StyledButton } from '../ui/StyledButton/StyledButton'
import { useState } from 'react'
import { SingleTeamType, SingleGameType } from '../../types'
import { EditGame } from './EditGame'
import { StyledLi } from '../ui/StyledList/StyledList'

type SingleGameProps = {
	game: SingleGameType
	teamsToGame: SingleTeamType[]
}

const SingleGame = ({ game, teamsToGame }: SingleGameProps) => {
	const [isEditing, setIsEditing] = useState(false)

	const handleEditTeam = () => {
		setIsEditing(true)
	}

	return (
		<StyledLi key={game.id}>
			<p>
				<span>Nazwa rozgrywki:</span> {game.title}
			</p>
			<p>
				<span>Data:</span> {game.date}
			</p>
			<p>
				<span>Lokalizacja:</span> {game.location}
			</p>
			<p>
				<span>Czas trwania spotkania:</span> {`${game.duration} min`}
			</p>
			<p>
				<span>Wynik:</span> {game.score}
			</p>
			<div>
				<span>Drużyny:</span>
				{teamsToGame.map(team => (
					<p key={team.id}>{`${team.name}`}</p>
				))}
			</div>
			<StyledButton onClick={handleEditTeam}>Edytuj</StyledButton>
			{isEditing && <EditGame setEdit={setIsEditing} game={game} />}
		</StyledLi>
	)
}

export { SingleGame }
