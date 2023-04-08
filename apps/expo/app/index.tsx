import React from 'react'
import { SignedIn, SignedOut, useClerk } from '@clerk/clerk-expo'
import SignInWithOAuth from 'app/components/SignInWithOAuth'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect } from 'expo-router'

export default function index() {
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
