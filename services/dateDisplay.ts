import { DateTime } from '../types/Event';
interface iDate {
	day: number;
	month: number;
	monthString: string;
	year: number;
	hours?: number;
	minutes?: number;
}
const displayDate = (date: string, time?: DateTime): iDate => {
	const dateObject = new Date(date);
	const monthMap: Record<number, string> = {
		1: 'January',
		2: 'February',
		3: 'March',
		4: 'April',
		5: 'May',
		6: 'June',
		7: 'July',
		8: 'August',
		9: 'September',
		10: 'October',
		11: 'November',
		12: 'December',
	};
	let result: iDate = {
		day: dateObject.getDate(),
		month: dateObject.getMonth() + 1,
		monthString: monthMap[dateObject.getMonth() + 1],
		year: dateObject.getFullYear(),
	};
	if (time) {
		result.hours = time.localTime.hourOfDay;
		result.minutes = time.localTime.minuteOfHour;
	}

	return result;
};

export default displayDate;
