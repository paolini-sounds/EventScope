import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ActivityIndicator, Text } from 'react-native-paper';
import useEventsStore from '../../state/eventsStore';
import EventList from '../Common/EventList';

export default function MyEvents() {
	const isHydrated = useEventsStore((state) => state.isHydrated);
	const events = useEventsStore((state) => state.events);
	return (
		<View>
			{!isHydrated ? <ActivityIndicator /> : <EventList events={events} />}
		</View>
	);
}

const styles = StyleSheet.create({});
