import {
	Dimensions,
	Pressable,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Portal, TextInput, Button } from 'react-native-paper';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import dayjs, { Dayjs } from 'dayjs';
import dateDisplay from '../../services/dateDisplay';
import useEventQueryStore from '../../state/eventsQueryStore';
import utc from 'dayjs/plugin/utc';
import useEvents from '../../hooks/useEvents';
import useDatePicker from '../../hooks/useDatePicker';

dayjs.extend(utc);

export default function DatePicker() {
	const {
		range,
		startDate,
		endDate,
		setRange,
		clearValues,
		handleDateChange,
		showModal,
		hideModal,
		showDatePicker,
	} = useDatePicker();

	const inputDisplayText = range.startDate
		? ` ${startDate} - ${endDate}`
		: 'Choose Dates';
	return (
		<>
			<Pressable
				style={{
					width: '100%',
					borderLeftColor: 'grey',
					borderLeftWidth: 0.5,
				}}
				onPress={showModal}
			>
				<TextInput
					contentStyle={range.startDate ? { fontSize: 10 } : { fontSize: 16 }}
					value={inputDisplayText}
					left={<TextInput.Icon icon='calendar' onPress={showModal} />}
					editable={false}
				/>
			</Pressable>

			{showDatePicker && (
				<Portal>
					<Modal
						visible={showDatePicker}
						onDismiss={hideModal}
						style={{
							backgroundColor: 'white',
							height: Dimensions.get('window').height * 0.66,
							top: 120,
						}}
					>
						<DateTimePicker
							mode='range'
							startDate={range.startDate}
							endDate={range.endDate}
							onChange={handleDateChange}
						/>

						<Button
							style={{ width: 130, alignSelf: 'center', marginBottom: 4 }}
							mode='outlined'
							onPress={() => {
								clearValues(['startDateTime', 'endDateTime']);

								setRange({ startDate: undefined, endDate: undefined });
							}}
						>
							Clear Dates
						</Button>
						<Button
							style={{ width: 130, alignSelf: 'center' }}
							mode='outlined'
							onPress={hideModal}
							compact={true}
						>
							Close
						</Button>
					</Modal>
				</Portal>
			)}
		</>
	);
}

const styles = StyleSheet.create({});
