interface Image {
	url: string;
	width: number;
	height: number;
	ratio: '16_9' | '3_2' | '4_3';
}

export interface DateTime {
	localDate: string;
	localTime: { hourOfDay: number; minuteOfHour: number };
}

export interface EventDates {
	start: DateTime;
	end: DateTime;
}

interface PriceRange {
	currency: string;
	min: number;
	max: number;
}

export interface Event {
	name: string;
	id: string;
	dates: EventDates;
	time: string;
	description: string;
	images: Image[];
	additionalInformation: string;
	priceRanges: PriceRange[];
	links: [];
}
