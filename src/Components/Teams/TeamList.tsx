import { useGetApi } from '../../hooks/useGetApi'
import { StyledListUl } from '../ui/StyledList/StyledList'
import { SingleTeam } from './SingleTeam'

const TeamList = () => {
	const { teams, players } = useGetApi()

	return (
		<StyledListUl>
			{teams?.map(team => {
				const playersToTeam = players?.filter(player => player.teamId === team.id) || []
				return <SingleTeam playersToTeam={playersToTeam} team={team} key={team.id} />
			})}
		</StyledListUl>
	)
}

export { TeamList }
