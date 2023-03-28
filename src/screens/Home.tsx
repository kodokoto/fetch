import { View, Text } from 'react-native'
import React from 'react'
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppointmentsPreview from '../components/AppointmentPreview';

// const Stack = createNativeStackNavigator();
export const mockAppointmentData = {
    imageUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
    sitterName: 'Jessica',
    appointment: 'walk with fufu',
    dateDescription: 'next friday at 10am',
    bookingFrequency: 'weekly'
}


export default function Home() {
  return (
    
    <View>
      <AppointmentsPreview{...mockAppointmentData}/>
    </View>
  )
}
