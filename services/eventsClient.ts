import axios, { AxiosRequestConfig } from 'axios';
//@ts-expect-error
import { BASE_URL, API_KEY } from '@env';
import qs from 'qs';
import { Event } from '../types/Event';

export interface FetchEvents {
	_embedded: { events: Event[] };
	_links: {};
	next: { href: string };
	page: {
		size: number;
		totalElements: number;
		totalPages: number;
		number: number;
	};
}

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	params: {
		apikey: API_KEY,
	},
	paramsSerializer: (params) => qs.stringify(params, { encode: false }),
});

class EventsClient {
	endpoint = 'https://app.ticketmaster.com/discovery/v2/events.json?';
	getAll(config: AxiosRequestConfig) {
		return axiosInstance
			.get<FetchEvents>(this.endpoint, config)
			.then((res) => res.data);
	}
}

export default EventsClient;
