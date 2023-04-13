import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { Button, View } from 'react-native'
import { useOAuth } from '@clerk/clerk-expo'
import { useWarmUpBrowser } from '../utils/useWarmUpBrowser'
import * as AuthSession from 'expo-auth-session'

WebBrowser.maybeCompleteAuthSession()

const SignInWithOAuth = () => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser()

  const redirectUrl = AuthSession.makeRedirectUri({
    path: '/',
  })

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google', redirectUrl: redirectUrl })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow()

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      } else {
        // if (!signUp || signIn.firstFactorVerification.status !== 'transferable') {
        //   throw 'Something went wrong during the Sign up OAuth flow. Please ensure that all sign up requirements are met.'
        // }
        // console.log("Didn't have an account transferring, following through with new account sign up")
        // // Create user
        // await signUp.create({ transfer: true })
        // await setActive(signUp.createdSessionId)
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])

  return (
    <View className=" h-full flex justify-center">
      <Button title="Sign in with Google" onPress={onPress} />
    </View>
  )
}
export default SignInWithOAuth

