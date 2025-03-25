import styled from 'styled-components'
import { StyledButton } from '../ui/StyledButton/StyledButton'
import { useState } from 'react'
import { SingleTeamType, SingleGameType } from '../../types'
import { EditGame } from './EditGame'

type SingleGameProps = {
	game: SingleGameType
	teamsToGame: SingleTeamType[]
}

const List = styled.li`
	padding: 10px;
	span {
		font-weight: bold;
	}
`

const SingleGame = ({ game, teamsToGame }: SingleGameProps) => {
	const [isEditing, setIsEditing] = useState(false)

	const handleEditTeam = () => {
		setIsEditing(true)
	}

	return (
		<List key={game.id}>
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
		</List>
	)
}

export { SingleGame }
