import styled from 'styled-components'
import { AddGame } from './AddGame'
import { GameList } from './GameList'
const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 100px;
`

const Games = () => {
	return (
		<Container>
			<GameList />
			<AddGame />
		</Container>
	)
}

export { Games }
