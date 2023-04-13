import { Slot, Stack } from 'expo-router'
import Provider from 'app/provider'
import { SignedIn, SignedOut } from '@clerk/clerk-expo'
import SignInWithOAuth from 'app/components/SignInWithOAuth'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

export default function root() {
  const [fontsLoaded] = useFonts({
    'Vulf-mono': require('app/fonts/vulfmono-italic.woff.ttf'),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <Provider>
      <SafeAreaProvider>
        <SignedIn>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="create"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </SignedIn>
        <SignedOut>
          <SafeAreaView>
            <SignInWithOAuth />
          </SafeAreaView>
        </SignedOut>
      </SafeAreaProvider>
    </Provider>
  )
}
