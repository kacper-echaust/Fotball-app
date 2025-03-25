import styled from 'styled-components'
import { StyledButton } from '../ui/StyledButton/StyledButton'
import { EditTeam } from './EditTeam'
import { useState } from 'react'
import { SingleTeamType, SinglePlayerType } from '../../types'
import { useDeleteApi } from '../../hooks/useDeleteApi'
import { useGetApi } from '../../hooks/useGetApi'

type SingleTeamProps = {
	team: SingleTeamType
	playersToTeam: SinglePlayerType[]
}

const List = styled.li`
	padding: 10px;
	span {
		font-weight: bold;
	}
`
const AcceptDeleteDiv = styled.div`
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: white;
	border: 2px solid black;
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	z-index: 2;
`
const ErrorP = styled.p`
	color: red;
	margin: 0;
	padding: 0;
`
const SingleTeam = ({ team, playersToTeam }: SingleTeamProps) => {
	const { mutate } = useDeleteApi('teams')
	const { games } = useGetApi()
	const [isEditing, setIsEditing] = useState(false)
	const [isDelete, setIsDelete] = useState(false)
	const [error, setError] = useState('')

	const handleEditTeam = () => {
		setIsEditing(true)
	}
	const handleDelete = () => {
		const isTeamInCompetition = games?.filter(
			game => game.team1Id === Number(team.id) || game.team2Id === Number(team.id)
		)
		if (isTeamInCompetition?.length !== 0) {
			setError('Nie można usunąć drużyny która brała udział w rozgrywkach')
			setIsDelete(false)
			return
		}
		mutate(team.id)
		setError('')
	}

	return (
		<List key={team.id}>
			<p>
				<span>Nazwa drużyny:</span> {team.name}
			</p>
			<p>
				<span>Rok założenia:</span> {team.founded}
			</p>
			<p>
				<span>Lokalizacja:</span> {team.location}
			</p>
			<div>
				<span>Lista zawodników:</span>
				{playersToTeam.map(player => (
					<p key={player.id}>{`${player.firstName} ${player.lastName}`}</p>
				))}
			</div>
			<StyledButton onClick={handleEditTeam}>Edytuj</StyledButton>
			<StyledButton onClick={() => setIsDelete(true)}>Usuń</StyledButton>
			{error && <ErrorP>{error}</ErrorP>}
			{isEditing && <EditTeam setEdit={setIsEditing} team={team} players={playersToTeam} />}
			{isDelete && (
				<AcceptDeleteDiv>
					Potwierdzasz usunięcie drużyny?
					<StyledButton onClick={handleDelete}>Tak</StyledButton>
					<StyledButton onClick={() => setIsDelete(false)}>Anuluj</StyledButton>
				</AcceptDeleteDiv>
			)}
		</List>
	)
}

export { SingleTeam }
