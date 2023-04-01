import { Text, View } from 'react-native'
import { Button, Box, NativeBaseProvider } from 'native-base'
import React from 'react'

interface Props {
  location: string
}
const distance = 5;

export default function SitterProfileLocation(props: Props) {
  return (
    <View>
      <Text className="text-xl">Location</Text>
      <Box className="border-2 flex-row">
        <Text className="text-xl">{props.location}</Text>
        <Text className="text-xl">{distance} miles away</Text>
      </Box>
      
    </View>
  )
}
