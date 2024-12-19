import { create } from 'zustand';

export interface Location {
	latitude: number | undefined;
	longitude: number | undefined;
}

interface LocationStore {
	location: Location | undefined;
	setLocation: (location: Location) => void;
}

const useLocationStore = create<LocationStore>((set) => ({
	location: undefined,
	setLocation: (location) =>
		set(() => ({
			location: { latitude: location.latitude, longitude: location.longitude },
		})),
}));

export default useLocationStore;
