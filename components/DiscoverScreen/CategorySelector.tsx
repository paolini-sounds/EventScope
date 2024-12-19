import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import {
	Button,
	Icon,
	Modal,
	Portal,
	RadioButton,
	SegmentedButtons,
	Surface,
	Text,
	TouchableRipple,
	useTheme,
} from 'react-native-paper';
import useEventQueryStore from '../../state/eventsQueryStore';

export default function CategorySelector() {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const { eventQuery, setClassificationName } = useEventQueryStore((s) => s);
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const theme = useTheme();

	const options = [
		{ label: 'Music', value: 'music' },
		{ label: 'Sports', value: 'sports' },
		{ label: 'Arts & Theatre', value: 'arts&theatre' },
		{ label: 'Film', value: 'film' },
		{ label: 'Miscellaneous', value: 'miscellaneous' },
	];

	const toggleOption = (value: string) => {
		setClassificationName(value);
	};

	return (
		<>
			<Pressable
				onPress={() => setIsVisible(true)}
				style={{
					width: Dimensions.get('window').width / 2,
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Icon size={18} source='chevron-down' />
				<Text style={{ color: theme.colors.primary, fontWeight: '600' }}>
					Select Categories{' '}
				</Text>
				{eventQuery!.classificationName?.length! > 0 && (
					<Text style={{ color: theme.colors.primary, fontWeight: '600' }}>
						({eventQuery!.classificationName!.length})
					</Text>
				)}
			</Pressable>
			{isVisible && (
				<Portal>
					<Modal
						visible={isVisible}
						style={[
							styles.container,
							{ backgroundColor: theme.colors.background },
						]}
						onDismiss={() => setIsVisible(false)}
					>
						<Text style={styles.title}>Select Categories</Text>
						{options.map((option) => (
							<View key={option.value} style={styles.optionContainer}>
								<RadioButton.Item
									label={option.label}
									value={option.value}
									style={{ width: '100%' }}
									labelStyle={styles.label}
									status={
										eventQuery.classificationName?.includes(option.value)
											? 'checked'
											: 'unchecked'
									}
									onPress={() => toggleOption(option.value)}
								/>
							</View>
						))}
						<Button onPress={() => setIsVisible(false)}>Close</Button>
					</Modal>
				</Portal>
			)}
		</>
	);
}

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
	container: {
		top: height * 0.27,
		padding: 24,

		height: height * 0.6,
		flex: 1,
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	title: {
		fontSize: 18,
		marginBottom: 12,
		textAlign: 'center',
	},
	optionContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'default',
	},
	label: {
		fontSize: 16,
	},
	button: {
		marginTop: 16,
	},
});
