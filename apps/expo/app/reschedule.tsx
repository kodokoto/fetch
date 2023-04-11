import { View, Text } from 'react-native'
import React from 'react'
import Reschedule from 'app/components/RescheduleBooking'
import { useSearchParams } from 'expo-router'

export default function Search() {
  const { bookingId } = useSearchParams()
  return (
    <View className="h-96">
      <Reschedule />
    </View>
  )
}