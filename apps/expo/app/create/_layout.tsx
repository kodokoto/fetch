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
    </Stack>
  )
}
