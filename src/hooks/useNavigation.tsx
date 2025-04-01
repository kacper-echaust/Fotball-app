import { useState } from 'react'

export enum NavigationTypes {
	GAMES,
	PLAYERS,
	TEAMS,
	STATS,
}
const useNavigation = () => {
	const [navigation, setNavigation] = useState<NavigationTypes>(NavigationTypes.STATS)

	const handleChangeNavigation = (nav: number) => {
		setNavigation(nav)
	}
	return {
		navigation,
		handleChangeNavigation,
	}
}
export { useNavigation }
