import styled from 'styled-components'
import { AddTeam } from './AddTeam'
import { TeamList } from './TeamList'

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding:100px;
`

const Teams = () => {
	return (
		<Container>
			<TeamList />
			<AddTeam />
		</Container>
	)
}

export { Teams }
