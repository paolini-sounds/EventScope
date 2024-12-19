import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import RootStack from './components/Common/RootStack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
	return (
		<PaperProvider>
			<QueryClientProvider client={queryClient}>
				<NavigationContainer>
					<RootStack />
				</NavigationContainer>
			</QueryClientProvider>
		</PaperProvider>
	);
}
