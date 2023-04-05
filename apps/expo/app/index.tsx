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
        </SignedIn>
        <SignedOut>
          <SignInWithOAuth />
        </SignedOut>
      </SafeAreaView>
    </>
  )
}