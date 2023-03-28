import { View, Text } from 'react-native'
import React from 'react'
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppointmentsPreview from '../components/AppointmentPreview';

// const Stack = createNativeStackNavigator();
export const mockAppointmentData = {
    imageUrl: "../assets/userIcon.png",
    sitterName: 'Jessica',
    appointment: 'walk with fufu',
    dateDescription: 'next friday at 10am',
    bookingFrequency: 'weekly';
}


export default function Home() {
  return (
    
    <View>
      <Text className="text-red-500">Test</Text>
      <AppointmentsPreview{...mockAppointmentData}/>
    </View>
  )
}
