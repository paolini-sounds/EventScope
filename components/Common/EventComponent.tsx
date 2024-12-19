import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DateTime, Event } from '../../types/Event';
import { Card, IconButton, Text, Snackbar, Portal } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../DiscoverScreen/DiscoverStackScreen';
import useEventComponent from '../../hooks/useEventComponent';
import displayDate from '../../services/dateDisplay';

interface Props {
	event: Event;
}

type Navigation = NavigationProp<RootStackParamList>;

export default function EventComponent({ event }: Props) {
	const {
		eventImage,
		handleAddEvent,
		handleRemoveEvent,
		isAdded,
		visible,
		onDismissSnackBar,
	} = useEventComponent(event);
	const navigation = useNavigation<Navigation>();

	const eventDate = displayDate(event.dates.start.localDate);
	return (
		<Card
			contentStyle={{
				backgroundColor: 'default',
			}}
			style={{ marginTop: 8 }}
			onPress={() => navigation.navigate('Event Details', { event: event })}
		>
			<Card.Cover
				source={{ uri: eventImage?.url }}
				style={{ backgroundColor: 'default' }}
			/>
			<View
				style={{
					flexDirection: 'column',
					justifyContent: 'space-between',
					paddingHorizontal: 24,
					paddingBottom: 4,
				}}
			>
				<View
					style={{
						width: '100%',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Text>
						{eventDate.monthString.substring(0, 3)} {eventDate.day},{' '}
						{eventDate.year}
					</Text>
					<IconButton
						icon={isAdded ? 'minus' : 'plus'}
						size={12}
						mode='contained'
						onPress={
							isAdded
								? () => handleRemoveEvent(event.id)
								: () => handleAddEvent(event)
						}
					/>
				</View>
				<View>
					<Text
						style={{
							fontSize: 18,
							fontWeight: '600',
							paddingBottom: 8,
							textAlign: 'center',
						}}
					>
						{event.name}
					</Text>
				</View>

				<Portal>
					<Snackbar
						visible={visible}
						onIconPress={onDismissSnackBar}
						onDismiss={onDismissSnackBar}
						action={{
							label: 'Undo',
							onPress: () => {
								handleRemoveEvent(event.id);
							},
						}}
					>
						Event Added!
					</Snackbar>
				</Portal>
			</View>
		</Card>
	);
}

const styles = StyleSheet.create({
	snackbar: { position: 'absolute', bottom: 16, left: 16, right: 16 },
});
