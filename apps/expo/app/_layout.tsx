import { SafeAreaProvider } from "react-native-safe-area-context";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { TRPCProvider } from "app/utils/trpc";
import { Slot } from "expo-router";
import Constants from "expo-constants";
import { tokenCache } from "app/provider/auth/cache";
import SignInSignUpScreen from "app/design/screens/SignIn";
import Home from "app/design/screens/Home";
import { Provider } from "app/provider";

export default function index() {
    console.log(Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY);
    return (
      <Provider>
          <SignedIn>
              <SafeAreaProvider>
                <Slot />
              </SafeAreaProvider>
          </SignedIn>
          <SignedOut>
            <SignInSignUpScreen />
          </SignedOut>
      </Provider>
      );
    }