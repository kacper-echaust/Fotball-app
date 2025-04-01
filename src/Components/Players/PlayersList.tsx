import { useGetApi } from '../../hooks/useGetApi'
import { useDeleteApi } from '../../hooks/useDeleteApi'
import { SinglePlayer } from './SinglePlayer'
import { StyledListUl } from '../ui/StyledList/StyledList'

const PlayersList = () => {
	const { players, teams } = useGetApi()
	const { mutate: handleDelete } = useDeleteApi('players')

	const handleClick = async (id: number) => {
		handleDelete(id)
	}

	if (!players) return <p>Wystąpił błąd</p>

	return (
		<StyledListUl>
			{players.map(player => {
				const { id, firstName, lastName, teamId } = player
				const team = teams?.find(team => Number(team.id) == teamId)
				return (
					<SinglePlayer
						onClick={() => handleClick(id)}
						key={id}
						firstName={firstName}
						lastName={lastName}
						team={team ? team.name : 'Nie posiada klubu'}
						teamId={teamId}
						id={id}
					/>
				)
			})}
		</StyledListUl>
	)
}

export { PlayersList }
