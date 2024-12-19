import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import EventDetails from '../Common/EventDetails';
import AppBar from '../Common/AppBar';
import MyEventsScreen from './MyEventsScreen';
import { Event } from '../../types/Event';

export type MyEventsStackParamList = {
	'My Events': undefined;
	'Event Details': { event?: Event };
};

const DiscoverStack = createNativeStackNavigator<MyEventsStackParamList>();

export default function MyEventsStackScreen() {
	return (
		<DiscoverStack.Navigator
			screenOptions={({ navigation, route }) => ({
				header: ({ options }) => (
					<AppBar
						back
						navigation={navigation}
						title={options?.title || route.name}
					/>
				),
			})}
		>
			<DiscoverStack.Screen name='My Events' component={MyEventsScreen} />
			<DiscoverStack.Screen name='Event Details' component={EventDetails} />
		</DiscoverStack.Navigator>
	);
}
