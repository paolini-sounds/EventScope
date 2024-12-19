import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import { BottomNavigation } from 'react-native-paper';
import DiscoverStackScreen from '../DiscoverScreen/DiscoverStackScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyEventsStackScreen from '../MyEventsScreen/MyEventsStackScreen';

const Tab = createBottomTabNavigator();

function RootStack() {
	return (
		<Tab.Navigator
			screenOptions={{ headerShown: false }}
			tabBar={({ navigation, state, descriptors, insets }) => (
				<BottomNavigation.Bar
					navigationState={state}
					safeAreaInsets={insets}
					style={{ height: 85, backgroundColor: 'white' }}
					onTabPress={({ route, preventDefault }) => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						});

						if (event.defaultPrevented) {
							preventDefault();
						} else {
							navigation.dispatch({
								...CommonActions.navigate(route.name, route.params),
								target: state.key,
							});
						}
					}}
					renderIcon={({ route, focused, color }) => {
						const { options } = descriptors[route.key];
						if (options.tabBarIcon) {
							return options.tabBarIcon({ focused, color, size: 24 });
						}

						return null;
					}}
					// @ts-expect-error
					getLabelText={({ route }) => {
						const { options } = descriptors[route.key];
						const label =
							options.tabBarLabel !== undefined
								? options.tabBarLabel
								: options.title !== undefined
								? options.title
								: route.name;

						return label;
					}}
				/>
			)}
		>
			<Tab.Screen
				name='Discover'
				component={DiscoverStackScreen}
				options={{
					title: 'Discover',
					tabBarLabel: 'Discover',
					tabBarIcon: ({ color, size }) => {
						return <Icon name='search-web' size={size} color={color} />;
					},
				}}
			/>
			<Tab.Screen
				name='My Events'
				component={MyEventsStackScreen}
				options={{
					tabBarLabel: 'My Events',
					tabBarIcon: ({ color, size }) => {
						return <Icon name='calendar' size={size} color={color} />;
					},
				}}
			/>
		</Tab.Navigator>
	);
}

export default RootStack;
