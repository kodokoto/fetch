import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'native-base'
import { Stack, Link } from 'expo-router'
import { useClerk } from '@clerk/clerk-expo'

const SignInOrSignUpScreen = () => {
  const { session: activeSession, user: activeUser } = useClerk()
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="flex flex-col justify-center items-center gap-8 h-[100%]">
        <Button>
          <Text>Sign in with Google</Text>
        </Button>
        <Text>Don't have an account?</Text>
        <Button>
          <Link href="/signup"></Link>
        </Button>
      </View>
    </>
  )
}

export default SignInOrSignUpScreen
