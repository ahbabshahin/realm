import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link, Stack, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { SignOutButton } from '@/components/SignOutButton';
import { useEffect, useState } from 'react';

export default function Page() {
	const { user, isLoaded } = useUser();
		const router = useRouter();
		const [hasMount, setHasMount] = useState(false)
		// Redirect to sign-in when signed out

		useEffect(() =>{
			setHasMount(true)
		}, [])
		useEffect(() => {
			if (hasMount && isLoaded && !user) {
				router.replace('/(auth)/sign-in'); // Redirect without back button
			}
		}, [user, isLoaded, hasMount]);
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
