import React from 'react'
import { SignedIn, SignedOut, useClerk } from '@clerk/clerk-expo'
import SignInWithOAuth from 'app/components/SignInWithOAuth'
import { SafeAreaView } from 'react-native-safe-area-context'
import Bookings from 'app/components/Bookings'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from 'react-native'


export default function index() {
  const { signOut } = useClerk()
  return (
    <>
      <SafeAreaView>
        <SignedIn>
          <Bookings />
          <TouchableOpacity onPress={() => signOut()} >
            <Text>Sign out</Text>
          </TouchableOpacity>
        </SignedIn>
        <SignedOut>
          <SignInWithOAuth />
        </SignedOut>
      </SafeAreaView>
    </>
  )
}