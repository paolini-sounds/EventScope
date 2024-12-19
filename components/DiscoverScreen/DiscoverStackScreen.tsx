import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Appbar } from 'react-native-paper';
import DiscoverScreen from './DiscoverScreen';
import EventDetails from '../Common/EventDetails';
import AppBar from '../Common/AppBar';
import { Event } from '../../types/Event';

export type RootStackParamList = {
	'Discover Events': undefined;
	'Event Details': { event?: Event };
};

const DiscoverStack = createNativeStackNavigator<RootStackParamList>();

export default function DiscoverStackScreen() {
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
			<DiscoverStack.Screen name='Discover Events' component={DiscoverScreen} />
			<DiscoverStack.Screen name='Event Details' component={EventDetails} />
		</DiscoverStack.Navigator>
	);
}
