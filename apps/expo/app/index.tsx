import React from 'react'
import { SignedIn, SignedOut, useClerk } from '@clerk/clerk-expo'
import SignInWithOAuth from 'app/components/SignInWithOAuth'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect } from 'expo-router'


export default function index() {
  const { signOut } = useClerk()
  return (
    <>
      <SafeAreaView>
        <SignedIn>
          <Redirect href="/home" />
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