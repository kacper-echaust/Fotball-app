import styled from 'styled-components'
import { AddTeam } from './AddTeam'
import { TeamList } from './TeamList'

const Container = styled.div`
	padding: 50px;
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
