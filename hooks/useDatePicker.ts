import { useCallback, useEffect, useState } from 'react';
import useEventQueryStore from '../state/eventsQueryStore';
import { DateType } from 'react-native-ui-datepicker';
import useEvents from './useEvents';
import dateDisplay from '../services/dateDisplay';
import dayjs, { utc } from 'dayjs';

const useDatePicker = () => {
	const initialState = { startDate: undefined, endDate: undefined };
	const { setStartDateTime, setEndDateTime, clearValues, eventQuery } =
		useEventQueryStore();
	const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
	const [range, setRange] = useState<{
		startDate: DateType;
		endDate: DateType;
	}>(initialState);

	const showModal = () => setShowDatePicker(true);
	const hideModal = () => setShowDatePicker(false);
	const { refetch } = useEvents();

	const displayDateInput = (inputDate: DateType): string => {
		const dateString = dateDisplay(inputDate!.toString());
		return `${dateString.month}/${dateString.day}/${dateString.year}`;
	};

	const toAPIString = (inputDate: DateType): string => {
		return dayjs(inputDate).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
	};

	const startDate = range.startDate ? displayDateInput(range.startDate) : '';
	const endDate = range.endDate ? displayDateInput(range.endDate) : '';
	const handleDateChange = useCallback(
		(params: { startDate: DateType; endDate: DateType }) => {
			setRange(params);

			// Use the incoming `params` directly to avoid stale state
			setStartDateTime(toAPIString(params.startDate));
			setEndDateTime(toAPIString(params.endDate));

			// Trigger refetch
			refetch();
		},
		[setStartDateTime, setEndDateTime, toAPIString, refetch]
	);

	useEffect(() => {
		if (!eventQuery.startDateTime) {
			setRange(initialState);
		} else if (!eventQuery.endDateTime)
			setRange({ ...range, endDate: undefined });
	}, [eventQuery.endDateTime, eventQuery.startDateTime]);

	return {
		showDatePicker,
		range,
		setRange,
		clearValues,
		startDate,
		endDate,
		handleDateChange,
		showModal,
		hideModal,
	};
};

export default useDatePicker;
