import { create } from 'zustand';
import { Location } from './locationStore';

type SortValues =
	| 'name,asc'
	| 'name,desc'
	| 'date,asc'
	| 'date,desc'
	| 'relevance,asc'
	| 'relevance,desc'
	| 'distance,asc';

interface EventQuery {
	location?: Location;
	postalCode?: string;
	radius?: string;
	unit?: 'miles';
	geoHash?: string;
	keyword?: string;
	classificationName?: string[];
	startDateTime?: string;
	endDateTime?: string;
	sort?: SortValues;
}

interface EventQueryStore {
	eventQuery: EventQuery;
	setPostalCode: (postalCode: string) => void;
	setSearchText: (searchText: string) => void;
	setRadius: (radius: string) => void;
	setGeoHash: (hash: string | undefined) => void;
	setStartDateTime: (startDateTime: string) => void;
	setEndDateTime: (endDateTime: string) => void;
	setClassificationName: (classificationName: string) => void;
	setSort: (sort: SortValues) => void;
	clearValues: (keys: string[]) => void;
	clearAll: () => void;
}

const initialState: EventQuery = {};

const useEventQueryStore = create<EventQueryStore>((set) => ({
	eventQuery: initialState,
	setPostalCode: (postalCode) =>
		set((store) => ({
			eventQuery: {
				...store.eventQuery,
				postalCode,
				radius: '50',
				unit: 'miles',
			},
		})),
	setSearchText: (searchText) =>
		set((store) => ({
			eventQuery: { ...store.eventQuery, keyword: searchText },
		})),
	setRadius: (radius) =>
		set((store) => ({ eventQuery: { ...store.eventQuery, radius } })),
	setGeoHash: (geoHash) =>
		set((store) => ({ eventQuery: { ...store.eventQuery, geoHash } })),
	setClassificationName: (classification) =>
		set((store) => ({
			eventQuery: {
				...store.eventQuery,
				classificationName: store.eventQuery.classificationName?.includes(
					classification
				)
					? store.eventQuery.classificationName.filter(
							(item) => item !== classification
					  )
					: [...(store.eventQuery.classificationName || []), classification],
			},
		})),
	setSort: (sort) =>
		set((store) => ({ eventQuery: { ...store.eventQuery, sort } })),
	setStartDateTime: (startDateTime) =>
		set((store) => ({
			eventQuery: {
				...store.eventQuery,
				startDateTime: startDateTime,
			},
		})),
	setEndDateTime: (endDateTime) =>
		set((store) => ({
			eventQuery: {
				...store.eventQuery,
				endDateTime: endDateTime,
			},
		})),
	clearValues: (keys) =>
		set((store) => ({
			eventQuery: Object.fromEntries(
				Object.entries(store.eventQuery).filter(([k]) => !keys.includes(k))
			),
		})),
	clearAll: () => set(() => ({ eventQuery: initialState })),
}));

export default useEventQueryStore;
