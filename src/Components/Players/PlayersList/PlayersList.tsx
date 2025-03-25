import styled from 'styled-components'
import { AddPlayer } from '../AddPlayer/AddPlayer'
import { useGetApi } from '../../../hooks/useGetApi'
import { useDeleteApi } from '../../../hooks/useDeleteApi'
import { SinglePlayer } from '../SinglePlayer/SinglePlayer'

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	position: relative;
	height: 100vh;
`

const PlayersList = () => {
	const { players, teams } = useGetApi()
	const { mutate: handleDelete } = useDeleteApi('players')

	const handleClick = async (id: number) => {
		handleDelete(id)
	}

	if (!players) return <p>Wystąpił błąd</p>

	return (
		<Wrapper>
			<div>
				<h3>Lista graczy:</h3>
				<ul>
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
				</ul>
			</div>
			<AddPlayer />
		</Wrapper>
	)
}

export { PlayersList }
