import { useEffect, useState } from 'react'
import { useGetApi } from '../../hooks/useGetApi'

type TeamScoreType = {
	name: string
	teamId: string
	score: number
}

const TopStats = () => {
	const { games, teams } = useGetApi()
	const [topTeams, setTopTeams] = useState<TeamScoreType[]>([])

	const getScore = () => {
		if (!games || !teams) return
		const initialScores = teams.map(team => ({
			name: team.name,
			teamId: String(team.id),
			score: 0,
		}))
		const teamCalcScores = initialScores.map(teamScore => {
			let totalScore = 0
			games.forEach(game => {
				const score = game.score.split('-')
				if (teamScore.teamId === String(game.team1Id)) {
					totalScore += Number(score[0])
				} else if (teamScore.teamId === String(game.team2Id)) {
					totalScore += Number(score[1])
				}
			})
			return { ...teamScore, score: totalScore }
		})

		const sortedTopTeams = [...teamCalcScores].sort((a, b) => b.score - a.score).slice(0, 3)
		setTopTeams(sortedTopTeams)
	}
	useEffect(() => {
		getScore()
	}, [games, teams])

	return (
		<div>
			<ul>
				{topTeams?.map(team => {
					return (
						<li key={team.teamId}>
							<p>Nazwa drużyny: {team.name}</p>
							<p>Liczba goli: {team.score}</p>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export { TopStats }
