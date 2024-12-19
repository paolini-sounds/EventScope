import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import useLocationStore from '../state/locationStore';
import geohash from 'ngeohash';

const useLocation = () => {
	const [effectTrigger, setEffectTrigger] = useState<boolean>(false);
	const { location, setLocation } = useLocationStore((state) => state);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const reqPermissionAndSetLoc = () => {
		setEffectTrigger(!effectTrigger);
	};
	useEffect(() => {
		async function getCurrentLocation() {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location.coords);
		}

		getCurrentLocation();
	}, [effectTrigger]);
	let hash = undefined;
	if (location?.latitude && location.longitude) {
		hash = geohash.encode(location.latitude, location.longitude, 5);
	}

	return { location, hash, errorMsg, reqPermissionAndSetLoc };
};

export default useLocation;
