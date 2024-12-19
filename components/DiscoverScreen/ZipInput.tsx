import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Icon, Portal, Surface, TextInput } from 'react-native-paper';
import useLocation from '../../hooks/useLocation';
import useEventQueryStore from '../../state/eventsQueryStore';
import useEvents from '../../hooks/useEvents';
import useZipInput from '../../hooks/useZipInput';

export default function ZipInput() {
	const {
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
	} = useZipInput();

	const { refetch } = useEvents();
	const inputRef = useRef<any>(null);
	const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
	const calculateDropdownPosition = () => {
		if (inputRef.current) {
			inputRef.current.measure(
				(
					x: number,
					y: number,
					width: number,
					height: number,
					pageX: number,
					pageY: number
				) => {
					setDropdownPosition({ top: pageY + height, left: pageX });
				}
			);
		}
	};
	useEffect(() => {
		if (isDropdownVisible) {
			calculateDropdownPosition();
		}
	}, [isDropdownVisible]);

	return (
		<>
			<View ref={inputRef}>
				<TextInput
					placeholder='Enter Zip'
					onChangeText={handleChangeText}
					value={isUsingLocation ? 'Current Location' : locationText}
					label=''
					style={{ width: screenWidth / 2 }}
					left={<TextInput.Icon icon='map-marker' onPress={handleFocus} />}
					onFocus={() => {
						handleFocus();
						calculateDropdownPosition();
					}}
					onBlur={() => setIsDropdownVisible(false)}
					contentStyle={isUsingLocation && { fontSize: 12 }}
					onSubmitEditing={() => {
						setIsDropdownVisible(false);
						refetch();
					}}
				/>
			</View>
			{isDropdownVisible && (
				<Portal>
					<Surface
						style={[
							styles.dropdown,
							{
								top: dropdownPosition.top,
								left: dropdownPosition.left,
							},
						]}
					>
						<TouchableOpacity
							style={styles.item}
							onPress={() => {
								reqPermissionAndSetLoc();
								setIsDropdownVisible(false);
								setIsUsingLocation(true);
								refetch();
							}}
						>
							<Icon source='map-marker' size={16} />
							<Text style={{ fontSize: 13 }}>Use Current Location</Text>
						</TouchableOpacity>
					</Surface>
				</Portal>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		justifyContent: 'flex-start',
	},
	input: {
		marginBottom: 4,
		alignItems: 'center',
	},
	dropdown: {
		position: 'absolute',
		top: 135,
		left: 0,
		right: 16,
		elevation: 4,
		backgroundColor: 'white',
		borderRadius: 4,
		zIndex: 1000,
		width: Dimensions.get('window').width / 2,
	},
	item: {
		padding: 12,
		flexDirection: 'row',
		gap: 8,
	},
});
