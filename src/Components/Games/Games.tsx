import styled from 'styled-components'
import { AddGame } from './AddGame'
import { GameList } from './GameList'
const Container = styled.div`
	padding: 50px;
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
