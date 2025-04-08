import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link, Stack, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { SignOutButton } from '@/components/SignOutButton';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Page() {
	const { user, isLoaded } = useUser();
	const router = useRouter();
	const [hasMount, setHasMount] = useState(false);
	const [chats, setChat] = useState([]);
	// Redirect to sign-in when signed out

	useEffect(() => {
		setHasMount(true);
	}, []);
	useEffect(() => {
		if (hasMount && isLoaded && !user) {
			router.replace('/(auth)/sign-in'); // Redirect without back button
		}
	}, [user, isLoaded, hasMount]);

	useEffect(() => {
		const run = async () => {
			try {
				await fetchChats();
			} catch (error) {
				console.error('Error fetching chats:', error);
			}
		};

		if (user) run();
	}, [user]);

	const fetchChats = async () => {
		try {
			console.log('fetch');
			// const chats = await axios.get(`/chat/${user?.id}`);
			const response: any = await axios.get(
				`http://192.168.1.14:5000/api/chat/user_12345`
			);

			console.log('chats', response?.data);
			if (response) {
				setChat(response?.data?.body);
			}
		} catch (err) {
			console.error('Error fetching chats:', err);
		}
	};
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<SignedIn>
				<Text>Hello</Text>
				<Text>{user?.emailAddresses[0].emailAddress}</Text>
				<Text>How May I help you?</Text>
				<Text>Chats </Text>
				{chats.map((chat: any, chatIndex: number) => (
					<View
						key={`chat-${chatIndex}`}
						style={{ marginBottom: 10 }}
					>
						{chat.messages.map((message: any, msgIndex: number) => (
							<View>
								<Text>{message?.role}: </Text>
								<Text key={`msg-${chatIndex}-${msgIndex}`}>
									{message.content}
								</Text>
							</View>
						))}
					</View>
				))}
				<SignOutButton />
			</SignedIn>
			<SignedOut>
				{/* <Link href='/(auth)/sign-in'>
					<Text>Sign in</Text>
				</Link> */}
				{/* <Link href='/(auth)/sign-up'>
					<Text>Sign up</Text>
				</Link> */}
				{/* <Stack>
					<Stack.Screen
						name='(auth)'
						options={{
							title: 'Sign in',
						}}
					/>
				</Stack> */}
			</SignedOut>
		</View>
	);
}
