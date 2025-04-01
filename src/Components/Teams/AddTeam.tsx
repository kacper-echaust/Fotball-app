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
	position: fixed;
	right: 20%;
	top: 20%;
`
const AddTeam = () => {
	const { mutateAsync: handleUpdateTeamPlayers } = useUpdateApi('players')
	const { mutateAsync: handleAddTeam } = usePostApi<SingleTeamType, SingleAddTeamType>('teams')
	const teamForm = useForm<TeamFormType>()
	const handleAddPlayerToTeam = (playersToTeam: SingleUpdatePlayerType[], teamId: number) => {
		if (!playersToTeam) return

		playersToTeam.forEach(playerToUpdate => {
			const updatedData = { ...playerToUpdate, teamId }
			handleUpdateTeamPlayers({ id: playerToUpdate.id.toString(), data: updatedData })
		})
	}
	const onSubmit = async (data: TeamFormType) => {
		const { name, founded, location, updatedPlayers } = data
		const newTeam = await handleAddTeam({ name, founded, location })
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
