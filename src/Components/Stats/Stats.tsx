import { useGetApi } from '../../hooks/useGetApi'
import { Chart } from './Chart'
import { TopStats } from './TopStats'
const Stats = () => {
	const { teams, games } = useGetApi()
	const dateOfAllGames = games?.map(game => game.date).sort()
	const lastGame = dateOfAllGames
		? games?.filter(game => game.date === dateOfAllGames[dateOfAllGames?.length - 1])
		: ''

	if (lastGame) {
		const playingTeams = teams?.filter(team => team.id === lastGame[0].team1Id || team.id === lastGame[0].team2Id)
		return (
			<>
				<h2>Ostatni rozegrany mecz:</h2>
				<ul>
					<li>
						Nazwa rozgrywki: <b>{lastGame[0].title}</b>
					</li>
					<li>
						Data: <b>{lastGame[0].date}</b>
					</li>
					<li>
						Czas trwania: <b>{lastGame[0].duration} min</b>
					</li>
					<li>
						Gdzie: <b>{lastGame[0].location}</b>
					</li>
					<li>
						Wynik: <b>{lastGame[0].score}</b>
					</li>
					<li>
						Drużyny:
						<b>{playingTeams && `${playingTeams[0].name} vs ${playingTeams[1].name}`}</b>
					</li>
				</ul>
				<div>
					<h2>Ilość rozgrywek w danym okresie:</h2>
					<Chart />
				</div>
				<div>
				<h2>Top 3 drużyny: </h2>
				<TopStats />
				</div>
			</>
		)
	}
}

export { Stats }
