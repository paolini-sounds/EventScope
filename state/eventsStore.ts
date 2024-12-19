import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Event } from '../types/Event';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface EventsStore {
	events: Event[];
	addEvent: (event: Event) => void;
	removeEvent: (eventID: string) => void;
	isHydrated: boolean;
}

const useEventsStore = create<EventsStore>()(
	persist(
		(set) => ({
			events: [],
			addEvent: (event) =>
				set((state) => ({
					events: [...state.events, event],
				})),
			removeEvent: (id) =>
				set((state) => ({
					events: state.events.filter((event) => event.id !== id),
				})),
			isHydrated: false,
		}),
		{
			name: 'event-storage',
			storage: createJSONStorage(() => AsyncStorage),
			onRehydrateStorage: () => (state) => {
				if (state) {
					state.isHydrated = true;
				}
			},
		}
	)
);

export default useEventsStore;
