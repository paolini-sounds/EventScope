import { FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import React from 'react';
import { Event } from '../../types/Event';
import EventComponent from './EventComponent';
import useEvents from '../../hooks/useEvents';

interface Props {
	events: Event[] | [];
	onScrollDown: () => void;
}

export default function EventList({ events, onScrollDown }: Props) {
	const { isLoading, hasNextPage, fetchNextPage } = useEvents();
	const onReachEnd = () => {
		if (hasNextPage && !isLoading) {
			fetchNextPage();
		}
	};
	return events.length ? (
		<FlatList
			data={events}
			renderItem={({ item }) => <EventComponent key={item.id} event={item} />}
			keyExtractor={(item) => item.id}
			contentContainerStyle={{ paddingBottom: 150 }}
			onEndReached={onReachEnd}
			onEndReachedThreshold={0.5}
			onScrollBeginDrag={onScrollDown}
		></FlatList>
	) : (
		<Text>No results found.</Text>
	);
}

const styles = StyleSheet.create({});
