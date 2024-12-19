import { useEffect, useState } from 'react';
import useEventsStore from '../state/eventsStore';
import { Event } from '../types/Event';

const useEventComponent = (event: Event | undefined) => {
	const error = !event;
	const [visible, setVisible] = useState(false);
	const onToggleSnackBar = () => setVisible(!visible);
	const onDismissSnackBar = () => setVisible(false);

	const { events, addEvent, removeEvent } = useEventsStore((state) => state);
	const [isAdded, setIsAdded] = useState(false);
	useEffect(() => {
		setIsAdded(events.some((ev) => ev.id === event?.id));
	}, [events]);

	const handleAddEvent = (event: Event) => {
		addEvent(event);
		setVisible(true);
	};

	const handleRemoveEvent = (id: string) => {
		removeEvent(id);
	};

	const eventImage = event?.images.find((image) => image.ratio === '16_9') || {
		url: 'https://picsum.photos/seed/picsum/200/300',
	};

	return {
		error,
		visible,
		handleAddEvent,
		handleRemoveEvent,
		isAdded,
		onDismissSnackBar,
		eventImage,
	};
};

export default useEventComponent;
