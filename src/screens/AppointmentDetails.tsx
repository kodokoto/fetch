import { View, Text } from 'react-native'
import { useRoute } from '@react-navigation/native';
import React from 'react'
import AppDetail from '../components/AppDetail';

export const mockAppointmentData = [
  {
    id: 1,
    imageUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
    sitterName: 'Joey',
    username: 'PetLover101',
    pet: 'Fufu',
    price: 25,
    appointment: 'walk with fufu',
    dateDescription: 'Friday, 21 April',
    timeDescription: '1:00 - 4:00 PM',
    bookingFrequency: 'monthly',
    mostRecentMessage: 'hello'
  },
  {
    id: 2,
    imageUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
    sitterName: 'Jessica',
    username: 'Jessica Bifford',
    pet: 'Mario',
    price: 40,
    appointment: 'walk with mario',
    dateDescription: 'Monday, 29 July',
    timeDescription: '11:00 - 12:00 AM',
    bookingFrequency: 'weekly',
    mostRecentMessage: 'hi'
  }
]


export default function AppointmentDetails() {
  const route = useRoute();
  const id = route.params.appointmentData.id;
  let matchedAppointment = null;
  for(const appointment of mockAppointmentData){
    if(appointment.id === id){
      matchedAppointment = appointment;
    }
  }

  return (
    <View>
      {/* <Text className="text-2xl mx-auto mt-4">Appointment Details</Text> */}
      <AppDetail {...matchedAppointment}/>
    </View>
  )
}
