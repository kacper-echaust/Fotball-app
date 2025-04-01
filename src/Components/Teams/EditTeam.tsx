import { useForm } from 'react-hook-form'
import { useUpdateApi } from '../../hooks/useUpdateApi'
import { SinglePlayerType, SingleTeamType, SingleUpdatePlayerType, TeamFormType } from '../../types'
import { StyledButton } from '../ui/StyledButton/StyledButton'
import { TeamForm } from './TeamForm'
import styled from 'styled-components'

type EditTeamProps = {
	setEdit: React.Dispatch<React.SetStateAction<boolean>>
	team: SingleTeamType
	players: SinglePlayerType[]
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
const EditTeam = ({ setEdit, team, players }: EditTeamProps) => {
	const { mutateAsync: handleUpdateTeam } = useUpdateApi('teams')
	const { mutateAsync: handleUpdateTeamPlayers } = useUpdateApi('players')
	const teamForm = useForm<TeamFormType>({
		defaultValues: {
			name: team.name,
			founded: team.founded,
			location: team.location,
			updatedPlayers: players?.map(player => ({
				firstName: player.firstName,
				lastName: player.lastName,
				label: `${player.firstName} ${player.lastName}`,
				id: player.id,
			})),
		},
	})
	const handleCancelEdit = () => {
		setEdit(false)
	}
	const onSubmit = async (data: TeamFormType) => {
		const { name, founded, location, updatedPlayers } = data
		const updatedTeam = await handleUpdateTeam({ id: team.id.toString(), data: { name, founded, location } })
		if (updatedPlayers?.length && updatedTeam?.id) {
			handleUpdatePlayersToTeam(updatedPlayers, Number(updatedTeam.id))
		}
		setEdit(false)
	}

	const handleUpdatePlayersToTeam = (playersToTeam: SingleUpdatePlayerType[], teamId: number) => {
		console.log(playersToTeam)
		if (!playersToTeam) return

		playersToTeam.forEach(playerToUpdate => {
			const updatedData = { ...playerToUpdate, teamId }
			handleUpdateTeamPlayers({ id: playerToUpdate.id.toString(), data: updatedData })
		})
	}

	return (
		<Container>
			<TeamForm handleTeamSubmit={onSubmit} teamForm={teamForm}>
				<StyledButton>Edytuj drużynę</StyledButton>
				<StyledButton onClick={handleCancelEdit}>Anuluj</StyledButton>
			</TeamForm>
		</Container>
	)
}

export { EditTeam }
