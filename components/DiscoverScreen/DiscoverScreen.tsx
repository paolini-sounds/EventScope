import {
	StyleSheet,
	View as SafeAreaView,
	View,
	Pressable,
} from 'react-native';
import React, { useState } from 'react';
import EventList from '../Common/EventList';
import {
	ActivityIndicator,
	IconButton,
	Searchbar,
	Text,
} from 'react-native-paper';
import useEvents from '../../hooks/useEvents';
import SearchForm from './SearchForm';

export default function DiscoverScreen() {
	const { events, error, isLoading, isError } = useEvents();
	const [formVisible, setFormVisible] = useState<boolean>(true);

	const onScrollDown = () => {
		setFormVisible(false);
	};

	return (
		<>
			{formVisible ? (
				<SearchForm />
			) : (
				<Pressable
					onPress={() => setFormVisible(true)}
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text>Show Search Options</Text>
					<IconButton icon='chevron-down' style={{ alignSelf: 'center' }} />
				</Pressable>
			)}
			<SafeAreaView style={styles.container}>
				{isError ? (
					<Text>{error?.message}</Text>
				) : isLoading ? (
					<ActivityIndicator />
				) : events.length > 0 ? (
					<EventList events={events} onScrollDown={onScrollDown} />
				) : (
					<Text>No Events Found</Text>
				)}
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 8,
	},
});
