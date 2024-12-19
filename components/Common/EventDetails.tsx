import { StyleSheet, ScrollView, View, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../DiscoverScreen/DiscoverStackScreen';
import { Button, Text, Snackbar, Portal, useTheme } from 'react-native-paper';
import useEventsStore from '../../state/eventsStore';
import useEventComponent from '../../hooks/useEventComponent';
import displayDate from '../../services/dateDisplay';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Event Details'>;

type Props = {
	route: DetailsScreenRouteProp;
};

const EventDetails: React.FC<Props> = ({ route }) => {
	const { event } = route.params;
	const {
		eventImage,
		handleAddEvent,
		handleRemoveEvent,
		isAdded,
		visible,
		onDismissSnackBar,
	} = useEventComponent(event);
	const placeholderUrl = 'https://picsum.photos/seed/picsum/200/300';
	const screenWidth = Dimensions.get('window').width;
	const [prices, setPrices] = useState({
		hasPriceInfo: false,
		minPrice: 0,
		maxPrice: 0,
	});

	const eventDate = displayDate(event!.dates.start.localDate);

	useEffect(() => {
		if (
			event?.priceRanges &&
			event.priceRanges[0].min &&
			event.priceRanges[0].max
		) {
			setPrices({
				hasPriceInfo: true,
				minPrice: event.priceRanges[0].min,
				maxPrice: event.priceRanges[0].max,
			});
		}
	}, [event]);
	const theme = useTheme();

	return (
		<ScrollView
			contentContainerStyle={{
				justifyContent: 'center',
				alignItems: 'center',
				gap: 12,
			}}
			style={{ padding: 0, gap: 12 }}
		>
			{!event ? (
				<Text>Event not found</Text>
			) : (
				<>
					<Image
						style={{
							width: screenWidth,
							height: screenWidth / 2,
						}}
						source={{ uri: eventImage?.url }}
						onError={(error) =>
							console.error('Image failed to load:', error.nativeEvent)
						}
					/>
					<Text variant='headlineSmall' style={{ textAlign: 'center' }}>
						{event?.name}
					</Text>
					<Text variant='bodyMedium'>
						{eventDate.monthString} {eventDate.day}, {eventDate.year}
					</Text>
					{prices.hasPriceInfo ? (
						<Text>
							Tickets:{' '}
							{prices.minPrice === prices.maxPrice
								? `$${prices.minPrice}`
								: `$${prices.minPrice} - $${prices.maxPrice} `}
						</Text>
					) : (
						<Text>No Ticket Price Information was found for this event.</Text>
					)}
					<View style={{ width: 175, alignSelf: 'center', marginBottom: 8 }}>
						{!isAdded ? (
							<Button
								icon='plus'
								mode='contained'
								onPress={() => handleAddEvent(event)}
							>
								Add To Calendar
							</Button>
						) : (
							<Button
								icon='minus'
								mode='contained'
								onPress={() => handleRemoveEvent(event.id)}
								compact={true}
							>
								Remove
							</Button>
						)}
					</View>
					{event.description && (
						<View
							style={{
								backgroundColor: theme.colors.background,
								padding: 12,
								gap: 12,
							}}
						>
							<Text variant='headlineSmall'>Description</Text>
							<Text variant='bodyMedium'>{event.description}</Text>
						</View>
					)}

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
				</>
			)}
		</ScrollView>
	);
};

export default EventDetails;

const styles = StyleSheet.create({});
