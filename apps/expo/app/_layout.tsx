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
    </Provider>
  )
}
