import { View, Text, Button, TextInput } from 'react-native'
import React from 'react'
import TextSizeSetting from '../components/TextSizeSetting'
import ScreenResolutionSetting from '../components/ScreenResolutionSetting'
import { Box } from 'native-base'


export default function VisualSettings() {
  return (
    <View>
      <Box flex={1} bg="#fff" p={4}>
        <Text>Test</Text>
        <TextSizeSetting />
        <ScreenResolutionSetting />
      </Box>
    </View>
  )
}