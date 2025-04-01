import styled from 'styled-components'
import { PlayersList } from './PlayersList'
import { AddPlayer } from './AddPlayer'
const Container = styled.div`
	padding: 50px;
`

const Players = () => {
	return (
		<Container>
			<PlayersList />
			<AddPlayer />
		</Container>
	)
}

export { Players }
