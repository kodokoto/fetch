import { View, Text, Button, TextInput } from 'react-native'
import React from 'react'
import TextSizeSetting from '../components/TextSizeSetting'
import ScreenResolutionSetting from '../components/ScreenResolutionSetting'



export default function VisualSettings() {
    return (
      <View>
        <Text>Test</Text>
        <TextSizeSetting />
        <ScreenResolutionSetting />
      </View>
    )
  }