import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './Components/ui/GlobalStyles/GlobalStyles'
import { Games } from './Components/Games/Games'
import { Teams } from './Components/Teams/Teams'
import { Stats } from './Components/Stats/Stats'
import { Navigation } from './Components/Navigation/Navigation'
import { NavigationTypes, useNavigation } from './hooks/useNavigation'
import { Players } from './Components/Players/Players'

const queryClient = new QueryClient()

const App = () => {
	const { navigation, handleChangeNavigation } = useNavigation()
	const theme = {
		colors: {
			primary: '#FF6B00',
			secondary: '#0077FF',
		},
	}
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<Navigation navigation={navigation} handleChangeNavigation={handleChangeNavigation} />
				{navigation === NavigationTypes.GAMES && <Games />}
				{navigation === NavigationTypes.PLAYERS && <Players />}
				{navigation === NavigationTypes.TEAMS && <Teams />}
				{navigation === NavigationTypes.STATS && <Stats />}
			</ThemeProvider>
		</QueryClientProvider>
	)
}

export { App }
