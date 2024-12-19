import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import useLocation from './useLocation';
import useEventQueryStore from '../state/eventsQueryStore';
import useEvents from './useEvents';

const useZipInput = () => {
	const [locationText, setLocationText] = useState<string>('');
	const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
	const [isUsingLocation, setIsUsingLocation] = useState<boolean>(false);
	const { reqPermissionAndSetLoc, location, hash } = useLocation();

	const screenWidth = Dimensions.get('window').width;

	const handleChangeText = (e: string) => {
		if (isUsingLocation) {
			setLocationText('');
			setIsUsingLocation(false);
			return;
		}
		setIsUsingLocation(false);
		setLocationText(e);
	};

	const handleFocus = () => {
		setIsDropdownVisible(true);
	};

	const { setGeoHash, setPostalCode, eventQuery, clearValues } =
		useEventQueryStore((state) => state);

	function isValidZipCode(zip: string) {
		return /^\d{5}$/.test(zip);
	}

	useEffect(() => {
		if (isUsingLocation && hash) {
			setGeoHash(hash);
			clearValues(['postalCode']);
		} else {
			clearValues(['geoHash']);
			if (isValidZipCode(locationText)) {
				// $$ isNumber(location))
				setPostalCode(locationText);
			}
		}
	}, [location, locationText]);
	return {
		locationText,
		setLocationText,
		isDropdownVisible,
		setIsDropdownVisible,
		handleFocus,
		handleChangeText,
		isUsingLocation,
		setIsUsingLocation,
		screenWidth,
		reqPermissionAndSetLoc,
	};
};

export default useZipInput;
