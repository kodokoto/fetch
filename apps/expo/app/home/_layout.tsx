import { Stack } from 'expo-router';

export default function () {
    return <Stack>
    <Stack.Screen
      name="home"
      options={{
        // Hide the header for all other routes.
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="[booking]"
      options={{
        // Set the presentation mode to modal for our modal route.
        presentation: "modal",
      }}
    />
  </Stack>
;
}