import { View, Text } from 'react-native'
import { Box } from 'native-base'
import React from 'react'
import ProfileIcon from '../components/ProfileIcon'
import WelcomeMessage from '../components/WelcomeMessage'
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

export const mockUserData = {
  iconUrl:
    'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  userName: 'Joey',
}

export default function Home() {
  return (
    <View>
      <Box className="flex-wrap flex-row">
        <WelcomeMessage {...mockUserData} />
        <ProfileIcon {...mockUserData} />
      </Box>
      {mockAppointmentData.map((data, index) => (
        <AppointmentsPreview key={index} {...data} />
      ))}
    </View>
  )
}
