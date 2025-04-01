import styled from 'styled-components'
import { NavigationTypes } from '../../hooks/useNavigation'

type NavigationPropsType = {
	handleChangeNavigation: (nav: number) => void
	navigation: number
}
const Nav = styled.nav`
	position: relative;
	height: 100px;
`
const Ul = styled.ul`
	display: flex;
	width: 100%;
	justify-content: space-around;
	cursor: pointer;
	border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
	font-weight: bold;
	position: fixed;
	background-color: white;
	z-index: 2;
`
const Li = styled.li<{ $active: boolean }>`
	list-style: none;
	width: 100%;
	text-align: center;
	padding: 15px 0;
	transition: 0.2s;
	background-color: ${({ $active, theme }) => ($active ? theme.colors.primary : '')};
	color: ${({ $active, theme }) => ($active ? theme.colors.secondary : '')};
	&:hover {
		color: ${({ theme }) => theme.colors.secondary};
		background-color: ${({ theme }) => theme.colors.primary};
	}
`
const Navigation = ({ handleChangeNavigation, navigation }: NavigationPropsType) => {
	return (
		<Nav>
			<Ul>
				<Li
					$active={navigation === NavigationTypes.GAMES}
					onClick={() => handleChangeNavigation(NavigationTypes.GAMES)}>
					Mecze
				</Li>
				<Li
					$active={navigation === NavigationTypes.PLAYERS}
					onClick={() => handleChangeNavigation(NavigationTypes.PLAYERS)}>
					Gracze
				</Li>
				<Li
					$active={navigation === NavigationTypes.TEAMS}
					onClick={() => handleChangeNavigation(NavigationTypes.TEAMS)}>
					Drużyny
				</Li>
				<Li
					$active={navigation === NavigationTypes.STATS}
					onClick={() => handleChangeNavigation(NavigationTypes.STATS)}>
					Statystyki
				</Li>
			</Ul>
		</Nav>
	)
}

export { Navigation }
