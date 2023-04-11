import { Stack } from 'expo-router'

export default function () {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Choose your profile',
        }}
      />
      <Stack.Screen
        name="service"
        options={{
          headerTitle: 'Create a service',
        }}
      />
      <Stack.Screen
        name="owner"
        options={{
          headerTitle: 'Create an owner profile',
        }}
      />
      <Stack.Screen
        name="pet"
        options={{
          headerTitle: 'Create a pet profile',
          presentation: 'modal',
        }}
      />
    </Stack>
  )
}
