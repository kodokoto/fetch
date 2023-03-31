import { View, Text } from 'react-native'
import { useRoute } from '@react-navigation/native';
import React from 'react'


export default function Appointment() {
  const route = useRoute();

  return (
    <View>
      <Text className="text-blue-500">{route.params.appointmentData.id}</Text>
    </View>
  )
}