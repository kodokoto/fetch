import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

export default function DirectMessages({ route, navigation }) {
  const { username, mostRecentMessage } = route.params
  useEffect(() => {
    navigation.setParams({ headerTitle: username })
  }, [])
  return (
    <View>
      <Text>{mostRecentMessage}</Text>
      <Text className="text-red-500">Direct Message: {username}</Text>
    </View>
  )
}
