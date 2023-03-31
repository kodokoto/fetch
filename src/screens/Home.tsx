import { View, Text } from 'react-native'
import { Box } from 'native-base'
import React from 'react'
import AppointmentsPreview from '../components/AppointmentPreview';
// const Stack = createNativeStackNavigator();
export const mockAppointmentData = [
  {
    id: 1,
    imageUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
    sitterName: 'Jessica',
    appointment: 'walk with fufu',
    dateDescription: 'next friday at 10am',
    bookingFrequency: 'weekly'
  },
  {
    id: 2,
    imageUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
    sitterName: 'Jessica',
    appointment: 'walk with fufu',
    dateDescription: 'next friday at 10am',
    bookingFrequency: 'weekly'
  }
]

export default function Home() {
  return (
    <View>
      {mockAppointmentData.map((data, index) => (
        <AppointmentsPreview key={index} {...data} />
      ))}
    </View>
  )
}
