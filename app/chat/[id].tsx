import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Chat() {

	const {id} = useLocalSearchParams<{id: string}>()
	return (
		<View>
			<Text>Chat {id}</Text>
		</View>
	);
}
