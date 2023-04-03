import React from 'react'
import { SignedIn, SignedOut, useClerk } from '@clerk/clerk-expo'
import SignInWithOAuth from 'app/components/SignInWithOAuth'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect } from 'expo-router'
import { Text } from 'native-base'

export default function index() {
  const { signOut } = useClerk()
  return (
    <>
      <SafeAreaView>
        <SignedIn>
          <Redirect href="/home" />
          {/* <Text>Hello</Text> */}
          {/* <Bookings />
          <TouchableOpacity onPress={() => signOut()} >
            <Text>Sign out</Text>
          </TouchableOpacity> */}
        </SignedIn>
        <SignedOut>
          <SignInWithOAuth />
        </SignedOut>
      </SafeAreaView>
    </>
  )
}