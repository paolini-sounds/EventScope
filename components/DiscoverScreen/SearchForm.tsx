import { Dimensions, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { Button, DefaultTheme, useTheme } from 'react-native-paper';
import ZipInput from './ZipInput';
import DatePicker from './DatePicker';
import useEventQueryStore from '../../state/eventsQueryStore';
import useEvents from '../../hooks/useEvents';
import KeywordSearch from './KeywordSearch';
import CategorySelector from './CategorySelector';

export default function SearchForm() {
	const clearAll = useEventQueryStore((s) => s.clearAll);
	const theme = useTheme();
	return (
		<View>
			<View style={{ flexDirection: 'row' }}>
				<ZipInput />
				<DatePicker />
			</View>
			<KeywordSearch />
			<View
				style={{
					flexDirection: 'row',
					borderBottomColor: 'grey',
					borderBottomWidth: 0.5,
				}}
			>
				<CategorySelector />
				<View
					style={{
						width: Dimensions.get('window').width / 2,
						borderLeftColor: theme.colors.primary,
						borderLeftWidth: 0.5,
					}}
				>
					<Button onPress={clearAll}>Clear Filters</Button>
				</View>
			</View>
		</View>
	);
}
