import { useGetApi } from '../../hooks/useGetApi'
import { SingleTeam } from './SingleTeam'

const TeamList = () => {
	const { teams, players } = useGetApi()

	return (
		<ul>
			{teams?.map(team => {
				const playersToTeam = players?.filter(player => player.teamId === team.id) || []
				return <SingleTeam playersToTeam={playersToTeam} team={team} key={team.id} />
			})}
		</ul>
	)
}

export { TeamList }
