import { Slot } from 'expo-router'
import Provider from 'app/provider'
import { SignedIn, SignedOut } from '@clerk/clerk-expo'
import SignInWithOAuth from 'app/components/SignInWithOAuth'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function root() {
  return (
    <Provider>
        <SafeAreaProvider>
        <SignedIn>
          <Slot />
        </SignedIn>
        <SignedOut>
          <SignInWithOAuth />
        </SignedOut>
        </SafeAreaProvider>
      {/* <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            // Hide the header for all other routes.
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="booking/[booking]"
          options={{
            // Set the presentation mode to modal for our modal route.
            headerTitle: 'Booking',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="create"
          options={{
            headerShown: false,
          }}
        />
      </Stack> */}
    </Provider>
  )
}
