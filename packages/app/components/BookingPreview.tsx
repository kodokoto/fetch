//Import @React-navigation/native
import { useRouter } from 'expo-router'
import { Image, Text } from 'react-native'
import { Button, Box, FormControl, Avatar } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Booking } from '@prisma/client'
import { api } from '../utils/trpc'

function parseBookingFrequency(bookingFrequency: string) {
  switch (bookingFrequency) {
    case 'ONE_OFF':
      return 'One Off'
    case 'WEEKLY':
      return 'Every Week'
    case 'BI_WEEKLY':
      return 'Every Two Weeks'
    case 'MONTHLY':
      return 'Every Month'
    default:
      return ''
  }
}

function capitalizeWords(inputString) {
  return inputString.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
  });
}

function parseTime(TimeOfDay: string){
  switch (TimeOfDay) {
    case 'ANY':
      return 'Any'
    case 'MORNING':
      return '6am-11am'
    case 'AFTERNOON':
      return '11am-3pm'
    case 'EVENING':
      return '3pm-10pm'
    default:
      return ''
  }
}

export default function BookingPreview(props: Booking) {
  const router = useRouter()
  console.log(props)

  const { data: sitterData, error, isLoading } = api.sitter.byId.useQuery(String(props.sitterId))
  const { data: scheduledTime} = api.scheduledTime.byBookingId.useQuery(props.id)
  const {data: petData} = api.pet.byBookingId.useQuery(props.id)

  const handlePress = () => {
    router.push({
      pathname: `/booking/${props.id}`,
      params: { bookingId: props.id },
    })
  }

  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>

  return (
    <Button
      onPress={handlePress}
      className="m-auto rounded-2xl w-80 bg-[#4c8ab9] mt-6 mb-2 h-30 hover:bg-[#4c8ab9]  border-solid border-transparent border-2"
    >
      <Box className="bg-[#4c8ab9] rounded-2xl p-4 w-80 h-25 mb-2 flex-wrap flex-row justify-between">
        <Box className="float-left" style={{ flexDirection: 'row' }}>
          <Avatar source={{ uri: sitterData?.imageUrl }} className="w-12 h-12 md:w-48 md:h-auto float-left">
            AT
          </Avatar>
          <Box className="ml-4 float-left">
            <Text className="font-bold text-lg">{sitterData?.name}</Text>
            <Text>{petData? petData.map((pet) => pet.name).join(", ") : null}</Text>
          </Box>
        </Box>
        <Text className="flex-end">{scheduledTime ? parseBookingFrequency(scheduledTime.frequency) : null}</Text>
      </Box>
      <Box className="ml-4 flex-wrap flex-row">
        <Ionicons size={24} className="flex-start" name="ios-calendar-outline"></Ionicons>
        {/* <Text>{typeof props.startDate}</Text> */}
        <Text className='mx-2 text-md'>{scheduledTime ? capitalizeWords(scheduledTime.day) : null}</Text>
        <Ionicons size={24} name="ios-time-outline"></Ionicons>
        <Text className="mx-2 text-md">{scheduledTime ? parseTime(scheduledTime.time) : null}</Text>
      </Box>
    </Button>
  )
}