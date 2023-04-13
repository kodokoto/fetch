import { Box, Text, View } from 'native-base'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

type User = {
  name: string
}

export default function WelcomeMessage(props: User) {
  return (
    <View className="flex-row items-center ml-8">
      <View className="border border-transparent border-solid mr-4">
        <Text className="font-bold text-lg font-[Vulf-mono]">Hello,</Text>
        <Text className="font-bold text-3xl">{props.name}</Text>
      </View>
      <Text className="text-3xl">👋</Text>
    </View>
  )
}
