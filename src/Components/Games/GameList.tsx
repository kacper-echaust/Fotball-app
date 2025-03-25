import { useGetApi } from '../../hooks/useGetApi'
import { SingleGame } from './SingleGame'

const GameList = () => {
	const { games, teams } = useGetApi()
	return (
		<ul>
			{games?.map(game => {
				const teamToGame = teams?.filter(team => team.id === game.team1Id || team.id === game.team2Id) || []
				return <SingleGame teamsToGame={teamToGame} game={game} key={game.id} />
			})}
		</ul>
	)
}

export { GameList }
