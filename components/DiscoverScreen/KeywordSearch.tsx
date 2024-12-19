import { StyleSheet, TextInput as RNTextInput, View } from 'react-native';
import React, { useRef } from 'react';
import { TextInput } from 'react-native-paper';
import useEventQueryStore from '../../state/eventsQueryStore';
import useEvents from '../../hooks/useEvents';

export default function KeywordSearch() {
	const inputRef = useRef<RNTextInput>(null);
	const { setSearchText, clearAll, eventQuery, clearValues } =
		useEventQueryStore((s) => s);
	const { refetch } = useEvents();
	return (
		<TextInput
			ref={inputRef}
			onChangeText={setSearchText}
			value={eventQuery.keyword}
			onSubmitEditing={() => refetch()}
			autoCapitalize='none'
			autoCorrect={false}
			label='Search by keyword'
			keyboardType='default'
			left={<TextInput.Icon icon='search-web' onPress={() => refetch()} />}
			right={
				eventQuery.keyword && (
					<TextInput.Icon
						icon='close'
						onPress={() => {
							clearValues(['keyword']);
							refetch();
						}}
					/>
				)
			}
		/>
	);
}

const styles = StyleSheet.create({});
