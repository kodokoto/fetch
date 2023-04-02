import { View, Text } from 'react-native'
import React from 'react'
import { trpc } from '../../../packages/app/utils/trpc'

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
        <Text className='text-red-600'>Error: {error.message}</Text>
      </View>
    )
  }

  return (
    <View>
      <Text className='text-red-600'>
        {data.map(
          (booking) => `${booking.id} - ${booking.ownerId} - ${booking.status}`
        )}
      </Text>
    </View>
  )
}