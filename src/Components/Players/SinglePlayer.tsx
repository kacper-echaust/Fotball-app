import { useState } from 'react'
import styled from 'styled-components'
import { StyledButton } from '../ui/StyledButton/StyledButton'
import { EditPlayer } from './EditPlayer'
import { StyledLi } from '../ui/StyledList/StyledList'

type SinglePlayerProps = {
	firstName: string
	lastName: string
	team: string
	onClick: () => void
	teamId: number
	id: number
}

const Team = styled.p`
	margin: 0;
	padding: 0;
	font-weight: bold;
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
`

const ErrorP = styled.p`
	color: red;
	margin: 0;
	padding: 0;
`
const SinglePlayer = ({ firstName, lastName, team, onClick, teamId, id }: SinglePlayerProps) => {
	const [isDelete, setIsDelete] = useState(false)
	const [error, setError] = useState('')
	const [isEditing, setIsEditing] = useState(false)

	const handleToggleDelete = () => {
		setIsDelete(prevIsDelete => !prevIsDelete)
	}
	const handleToggleEdit = () => {
		setIsEditing(prevIsEditing => !prevIsEditing)
	}
	const handleDelete = () => {
		if (Number(teamId) !== 0) {
			setError('Nie można usunąć gracza przypisanego do klubu')
			setIsDelete(prevIsDelete => !prevIsDelete)
			return
		}
		setError('')
		onClick()
	}
	return (
		<StyledLi>
			{`${firstName} ${lastName}`}
			<Team>{team}</Team>
			{error && <ErrorP>{error}</ErrorP>}
			<div>
				<StyledButton onClick={handleToggleDelete}>Usuń</StyledButton>
				<StyledButton onClick={handleToggleEdit}>Edytuj</StyledButton>
			</div>
			{isDelete && (
				<AcceptDeleteDiv>
					<p>Czy napewno chcesz usunąć tego zawodnika?</p>
					<div>
						<StyledButton onClick={handleDelete}>Potwierdź</StyledButton>
						<StyledButton onClick={handleToggleDelete}>Anuluj</StyledButton>
					</div>
				</AcceptDeleteDiv>
			)}
			{isEditing && (
				<EditPlayer
					id={id}
					firstName={firstName}
					lastName={lastName}
					teamId={teamId}
					closeEdit={handleToggleEdit}></EditPlayer>
			)}
		</StyledLi>
	)
}

export { SinglePlayer }
