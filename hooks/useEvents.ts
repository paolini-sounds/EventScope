import EventsClient, { FetchEvents } from '../services/eventsClient';
import { Event } from '../types/Event';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import useLocation from './useLocation';
import useEventQueryStore from '../state/eventsQueryStore';
import dayjs, { utc } from 'dayjs';

const eventsClient = new EventsClient();

const useEvents = () => {
	const fallbackDate = dayjs().utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
	const { eventQuery } = useEventQueryStore();
	const {
		data,
		isLoading,
		isError,
		error,
		fetchNextPage,
		hasNextPage,
		refetch,
	} = useInfiniteQuery<FetchEvents, Error>({
		queryKey: ['events', eventQuery],
		queryFn: ({ pageParam = 1 }) =>
			eventsClient.getAll({
				params: {
					page: pageParam,
					size: 10,
					sort: 'date,asc',
					...eventQuery,
					startDateTime: eventQuery.startDateTime || fallbackDate,
					endDateTime: undefined,
				},
			}),
		getNextPageParam: (lastPage) => {
			const currentPage = lastPage.page.number;
			const totalPages = lastPage.page.totalPages;

			return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
		},
		initialPageParam: 1,
	});

	const events =
		data?.pages.flatMap((page) => page._embedded?.events || []) || [];

	return {
		events,
		isError,
		isLoading,
		error,
		fetchNextPage,
		hasNextPage,
		refetch,
	};
};

export default useEvents;
