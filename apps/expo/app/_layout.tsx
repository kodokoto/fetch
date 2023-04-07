import { Stack } from 'expo-router'
import Provider from 'app/provider'

export default function root() {
  return (
    <Provider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            // Hide the header for all other routes.
            headerShown: false,
          }}
        />
        {/*Create a path for the Settings page which is in /(settings)/Settings.tsx*/}
        <Stack.Screen
          name="settings"
          options={{
            // Hide the header for all other routes.
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="aboutus"
          options={{
            // Hide the header for all other routes.
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  )
}
