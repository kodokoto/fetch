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
            <Stack.Screen
                name="booking/[booking]"
                options={{
                    // Set the presentation mode to modal for our modal route.
                    headerTitle: "Booking",
                    presentation: "modal",
                }}
            />
        </Stack>
    </Provider>
  )
}