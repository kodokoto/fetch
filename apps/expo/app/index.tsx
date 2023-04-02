import { View, Text } from 'react-native'
import React from 'react'
import { trpc } from '../utils/trpc'

export default function index() {

  const { data, error, isLoading } = trpc.booking.all.useQuery();
  
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    )
  }

  return (
    <View>
      <Text>{data.map(
        (item) => {
          return item.id
        }
      )}</Text>
    </View>
  )
}