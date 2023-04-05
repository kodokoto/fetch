import { View, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Box } from 'native-base'

export default function SettingsMenu() {
  const router = useRouter()

  return (
    <View>
      <Box flex={1} bg="#fff" p={4}>
        {/* Button to take you to Visual Settings Screen */}
        <Button title="About us" onPress={() => router.push('about')} />
        <Button title="Visual Settings" onPress={() => router.push('visual-settings')} />
        {/* Button to take you to Terms and Conditions Screen */}
        <Button title="Terms and Conditions" onPress={() => router.push('terms-and-conditions')} />
        <Button title="Privacy Policy" />
        <Button title="Contact Us" />
        <Button title="FAQ" onPress={() => router.push('faq')} />
        <Button title="Log Out" />
        <Button title="Delete Account" />
        <Button title="Developer Settings" />
      </Box>
    </View>
  )
}
