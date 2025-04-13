import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link, Stack, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SignOutButton } from '@/components/SignOutButton';
import  { useEffect, useState } from 'react';
import axios from 'axios';
import { ChatList } from '@/models/Chat';
import { FlashList } from '@shopify/flash-list';

export default function Page() {
	const { user, isLoaded } = useUser();
	const router = useRouter();
	const [hasMount, setHasMount] = useState(false);
	const [chats, setChat] = useState<ChatList[]>([]);
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
				`http://192.168.1.9:5000/api/chat/user_12345`
			);

			console.log('chats', response?.data);
			if (response) {
				setChat(response?.data?.body);
			}
		} catch (err) {
			console.error('Error fetching chats:', err);
		}
	};

	const renderChatList = ({
		item,
		index,
	}: {
		item: ChatList;
		index: number;
	}) => (
		<View
			style={{
				marginBottom: 16,
				padding: 16,
				borderRadius: 12,
				backgroundColor: '#f0f0f0',
				shadowColor: '#000',
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.1,
				shadowRadius: 4,
				elevation: 3,
			}}
		>
			<Link href={{
				pathname: '/chat/[id]',
				params: {id: item?.chatId}
			}}>
				<Text
					style={{
						fontSize: 16,
						fontWeight: 'bold',
						marginBottom: 4,
					}}
				>
					{item?.bot}
				</Text>
				<Text style={{ color: '#666' }}>
					Created at: {new Date(item.createdAt).toLocaleString()}
				</Text>
			</Link>
			{/* <FlashList
				data={item.messages}
				estimatedItemSize={50}
				keyExtractor={(_, msgIndex) => `msg-${index}-${msgIndex}`}
				renderItem={({ item: message }) => (
					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							gap: 4,
						}}
					>
						<Text style={{ fontWeight: 'bold' }}>
							{message?.user}:
						</Text>
						<Text>{message.content}</Text>
					</View>
				)}
			/> */}
		</View>
	);
	return (
		<View style={{ flex: 1 }}>
			<SignedIn>
				<View style={{ flex: 1, padding: 16 }}>
					{/* <Text>Hello</Text>
					<Text>{user?.emailAddresses[0].emailAddress}</Text>
					<Text>How May I help you?</Text>
					<Text>Chats </Text> */}

					<FlashList
						data={chats}
						estimatedItemSize={100}
						keyExtractor={(_, index) => `chat-${index}`}
						renderItem={renderChatList}
					/>

					<SignOutButton />
				</View>

				<TouchableOpacity
					onPress={() =>
						router.push({
							pathname: '/chat/[id]',
							params: {id: user?.id}
						})
					}
					style={{
						position: 'absolute',
						bottom: 30,
						right: 20,
						backgroundColor: '#007AFF',
						paddingVertical: 14,
						paddingHorizontal: 20,
						borderRadius: 50,
						shadowColor: '#000',
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.25,
						shadowRadius: 3.84,
						elevation: 5,
					}}
				>
					<Text style={{ color: 'white', fontWeight: 'bold' }}>
						New Chat
					</Text>
				</TouchableOpacity>
			</SignedIn>
			<SignedOut></SignedOut>
		</View>
	);
}

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