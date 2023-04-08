import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Button, View } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../utils/useWarmUpBrowser";
 
WebBrowser.maybeCompleteAuthSession();
 
const SignInWithOAuth = () => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
 
  return (
    <View 
    // className=" h-full flex justify-center"
    >
    <Button
      
      title="Sign in with Google"
      onPress={onPress}
    />
    </View>
  );
}
export default SignInWithOAuth;

// import { useSignUp, useSignIn } from '@clerk/clerk-expo'
// import React from 'react'
// import { Button, View } from 'react-native'
// import * as AuthSession from 'expo-auth-session'

// const SignInWithOAuth = () => {
//   const { isLoaded, signIn, setSession } = useSignIn()
//   const { signUp } = useSignUp()
//   if (!isLoaded) return null

//   const handleSignInWithGooglePress = async () => {
//     try {
//       const redirectUrl = AuthSession.makeRedirectUri({
//         path: '/create'
//       })

//       // Choose your OAuth provider, based upon your instance.
//       await signIn.create({
//         strategy: 'oauth_google',
//         redirectUrl,
//       })

//       const {
//         firstFactorVerification: { externalVerificationRedirectURL },
//       } = signIn

//       if (!externalVerificationRedirectURL) throw 'Something went wrong during the OAuth flow. Try again.'

//       const authResult = await AuthSession.startAsync({
//         authUrl: externalVerificationRedirectURL.toString(),
//         returnUrl: redirectUrl,
//       })

//       if (authResult.type !== 'success') {
//         throw 'Something went wrong during the OAuth flow. Try again.'
//       }

//       // Get the rotatingTokenNonce from the redirect URL parameters
//       const { rotating_token_nonce: rotatingTokenNonce } = authResult.params

//       await signIn.reload({ rotatingTokenNonce })

//       const { createdSessionId } = signIn

//       if (createdSessionId) {
//         // If we have a createdSessionId, then auth was successful
//         await setSession(createdSessionId)
//       } else {
//         // If we have no createdSessionId, then this is a first time sign-in, so
//         // we should process this as a signUp instead
//         // Throw if we're not in the right state for creating a new user
//         if (!signUp || signIn.firstFactorVerification.status !== 'transferable') {
//           throw 'Something went wrong during the Sign up OAuth flow. Please ensure that all sign up requirements are met.'
//         }

//         console.log("Didn't have an account transferring, following through with new account sign up")

//         // Create user
//         await signUp.create({ transfer: true })
//         await signUp.reload({
//           rotatingTokenNonce: authResult.params.rotating_token_nonce,
//         })
//         await setSession(signUp.createdSessionId)
//       }
//     } catch (err) {
//       console.log(JSON.stringify(err, null, 2))
//       console.log('error signing in', err)
//     }
//   }

//   return (
//     <View>
//       <Button title="Sign in with Google" onPress={handleSignInWithGooglePress} />
//     </View>
//   )
// }

// export default SignInWithOAuth
