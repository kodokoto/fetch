import { useRouter } from 'expo-router'
import { Text } from 'react-native'
import { Button, Box, Divider, Avatar } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Booking } from '@prisma/client'
import { api } from '../utils/trpc'
import { Sitter, User } from 'db'

type AppointmentDetailProps = {
  id: number
  imageUrl: string
  sitterName: string
  username: string
  pet: string
  price: number
  appointment: string
  dateDescription: string
  timeDescription: string
  bookingFrequency: string
  mostRecentMessage: string
}

function getDateDescription(date: Date) {
  // desired output format: "Monday, 1 April"
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const
  return date.toLocaleDateString('en-US', options)
}

function getTimeDescription(start: Date, end: Date) {
  // desired output format: "10:00- 13:00"
  let s = new Date(start)
  let e = new Date(end)
  const options = { hour: 'numeric', minute: 'numeric' } as const
  return `${s.toLocaleTimeString('en-US', options)} - ${e.toLocaleTimeString('en-US', options)}`
}

function parseBookingFrequency(bookingFrequency: string) {
  switch (bookingFrequency) {
    case 'ONE_OFF':
      return 'one'
    case 'WEEKLY':
      return 'every week'
    case 'BI_WEEKLY':
      return 'every two weeks'
    case 'MONTHLY':
      return 'every month'
    default:
      return ''
  }
}

export default function BookingDetail(props: Booking) {
  const router = useRouter()

  const { data: sitterData, error, isLoading } = api.sitter.byId.useQuery(props.sitterId)

  // const userId = data.userId;
  const { data: userData, error: userError, isLoading: isloadingUser } = api.user.bySitterId.useQuery(sitterData.userId)

  const handleMessagePress = () => {
    router.push({
      pathname: '/DirectMessages',
      params: {
        username: props.sitterId,
        // mostRecentMessage: props.mostRecentMessage,
      },
    })
  }
  if (isLoading && isloadingUser) return <Text>Loading...</Text>
  if (error && userError) return <Text>{error.message}</Text>
  return (
    <>
      <Avatar className="mx-auto mt-28 mb-20 w-32 h-32" source={{ uri: userData?.imageUrl }}>
        LB
      </Avatar>
      <Box className="rounded-2xl border-[#4c8ab9] border-solid border-2 bg-slate-100 h-116">
        <Box className="flex-wrap flex-row my-4 justify-between">
          <Box className="flex-start">
            <Text className="text-2xl font-bold ml-4">{userData?.name}</Text>
            <Text className="text-lg ml-4">{props.status}</Text>
          </Box>
          <Button className="bg-white w-14 h-14 rounded-3xl flex-end mr-4" onPress={handleMessagePress}>
            <Ionicons size={28} color="#4c8ab9" name="chatbubble"></Ionicons>
          </Button>
        </Box>
        <Box className="rounded-2xl bg-white border-[#4c8ab9] border-solid border-2">
          <Box className="flex-wrap flex-row mt-4 mb-1">
            <Button className="rounded-3xl bg-white w-14 h-14 flex-start">
              <Ionicons className="mx-auto ml-2" size={30} color="#4c8ab9" name="paw"></Ionicons>
            </Button>
            <Box className="flex-end">
              <Text className="text-md">Pet</Text>
              <Text className="text-lg font-bold">{}</Text>
            </Box>
          </Box>
          <Divider my="2" _light={{ bg: '#4c8ab9' }} _dark={{ bg: '#4c8ab9' }} />
          <Box className="flex-wrap flex-row my-1">
            <Button className="rounded-3xl bg-white w-14 h-14 flex-start">
              <Ionicons size={30} color="#4c8ab9" className="ml-2" name="calendar"></Ionicons>
            </Button>
            <Box className="flex-end">
              <Text className="text-md">Date & Time</Text>
              <Text className="text-lg font-bold">{getTimeDescription(props.startDate, props.startDate)}</Text>
            </Box>
          </Box>
          <Divider my="2" _light={{ bg: '#4c8ab9' }} _dark={{ bg: '#4c8ab9' }} />
          {/* <Box className="flex-wrap flex-row my-1">
            <Button className="rounded-3xl bg-white w-14 h-14 flex-start">
              <Ionicons size={30} color="#4c8ab9" className="ml-2" name="pricetag"></Ionicons>
            </Button>
            <Box className="flex-end">
              <Text className="text-md">Price</Text>
              <Text className="text-lg font-bold">£{props.price}</Text>
            </Box>
          </Box> */}
          <Box className="flex-wrap flex-row mt-2 mb-10">
            <Button className="ml-auto rounded-2xl">Reschedule</Button>
            <Button className="mr-auto ml-2 rounded-2xl">Cancel</Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}
