import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

const AppBar = ({
	navigation,
	back,
	title,
}: {
	navigation: any;
	back: any;
	title: string;
}) => {
	return (
		<Appbar.Header>
			{navigation.canGoBack() && (
				<Appbar.BackAction onPress={navigation.goBack} />
			)}
			<Appbar.Content title={title} />
		</Appbar.Header>
	);
};

export default AppBar;
