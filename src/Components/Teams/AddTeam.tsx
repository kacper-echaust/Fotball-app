import { useForm } from 'react-hook-form'
import { usePostApi } from '../../hooks/usePostApi'
import { useUpdateApi } from '../../hooks/useUpdateApi'
import { SingleAddTeamType, SingleTeamType, TeamFormType } from '../../types'
import { StyledButton } from '../ui/StyledButton/StyledButton'
import { TeamForm } from './TeamForm'
import styled from 'styled-components'

type SingleUpdatePlayerType = {
	firstName: string
	lastName: string
	label: string
	id: number
}

const Container = styled.div`
	position: sticky;
	top: 0;
	right: 0;
`
const AddTeam = () => {
	const { mutateAsync: handleUpdateTeamPlayers } = useUpdateApi('players')
	const { mutateAsync: handleAddTeam } = usePostApi<SingleTeamType, SingleAddTeamType>('teams')
	const teamForm = useForm<TeamFormType>()
	const handleAddPlayerToTeam = (playersToTeam: SingleUpdatePlayerType[], teamId: number) => {
		console.log(playersToTeam)
		if (!playersToTeam) return

		playersToTeam.forEach(playerToUpdate => {
			const updatedData = { ...playerToUpdate, teamId }
			handleUpdateTeamPlayers({ id: playerToUpdate.id.toString(), data: updatedData })
		})
	}
	const onSubmit = async (data: TeamFormType) => {
		const { name, founded, location, updatedPlayers } = data
		// Najpierw dodaj drużynę i czekaj na jej ID
		console.log(data)
		const newTeam = await handleAddTeam({ name, founded, location })
		// Jeśli dodano zawodników, przypisz ich do drużyny
		if (updatedPlayers?.length && newTeam?.id) {
			handleAddPlayerToTeam(updatedPlayers, newTeam.id)
		}
	}

	return (
		<Container>
			<TeamForm handleTeamSubmit={onSubmit} teamForm={teamForm}>
				<StyledButton type='submit'>Dodaj Drużynę</StyledButton>
			</TeamForm>
		</Container>
	)
}

export { AddTeam }
