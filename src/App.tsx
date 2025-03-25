import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './Components/ui/GlobalStyles/GlobalStyles'

const queryClient = new QueryClient()

const App = () => {
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
			</ThemeProvider>
		</QueryClientProvider>
	)
}

export { App }
