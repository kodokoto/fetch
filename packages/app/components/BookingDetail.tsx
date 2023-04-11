import { useRouter } from 'expo-router'
import { Text } from 'react-native'
import { Button, Box, Divider, Avatar, ScrollView } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Booking } from '@prisma/client'
import { api } from '../utils/trpc'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'

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

function parseServiceType(serviceType: string) {
  switch (serviceType) {
    case 'WALK':
      return 'Walking'
    case 'PET_CARE':
      return 'Pet care'
    case 'HOUSE_SITTING':
      return 'House sitting'
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

export default function BookingDetail(props: Booking) {
  const [session, _] = useAtom(sessionAtom)
  const router = useRouter()
  const mutation = api.booking.updateStatusById.useMutation();
  const { data: sitterData, error, isLoading } = api.sitter.byId.useQuery(String(props.sitterId))
  const {data: serviceData} = api.service.byId.useQuery(props.serviceId)
  const {data: petData} = api.pet.byBookingId.useQuery(props.id)
  const {data: scheduledTime } = api.scheduledTime.byBookingId.useQuery(props.id)
  const { data } = api.booking.byIdWithScheduledTime.useQuery({
    id: props.id,
    include: 'scheduledTime',
  })

  const handleAcceptPress = () => {
    mutation.mutate({
      bookingId: props.id,
      status: 'ACCEPTED'
    })
    router.push("/home");
  }

  const handleRejectPress = () => {
    mutation.mutate({
      bookingId: props.id,
      status: 'REJECTED'
    })
    router.push("/home");
  }
 
  const handleMessagePress = () => {
    router.replace({
      pathname: '/messages',
      params: {
        receiverId: props.ownerId,
        senderId: props.sitterId,
        receiverName: sitterData?.name,
      },
    })
  }
  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>
  // console.log(scheduledTime.frequency)
  return (
    <ScrollView>
      <Avatar className="mx-auto mt-28 mb-20 w-32 h-32" source={{ uri: sitterData?.imageUrl }}>
        LB
      </Avatar>
      <Box className="rounded-2xl border-[#4c8ab9] border-solid border-2 bg-slate-100 h-116 w-96">
        <Box className="flex-wrap flex-row my-4 justify-between">
          <Box className="flex-start">
            <Text className="text-2xl font-bold ml-4">{sitterData?.name}</Text>
            <Text className="text-lg ml-4">{props.status}</Text>
          </Box>
          <Button onPress={handleAcceptPress} className="rounded-2xl">Accept</Button>
          <Button onPress={handleRejectPress} className="rounded-2xl">Reject</Button>
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
              <Text className="text-lg font-bold">
                {petData? petData.map((pet) => pet.name).join(", ") : null}
              </Text>
            </Box>
          </Box>
          <Divider my="2" _light={{ bg: '#4c8ab9' }} _dark={{ bg: '#4c8ab9' }} />
          <Box className="flex-wrap flex-row my-1">
            <Button className="rounded-3xl bg-white w-14 h-14 flex-start">
              <Ionicons size={30} color="#4c8ab9" className="ml-2" name="grid"></Ionicons>
            </Button>
            <Box className="flex-end">
              <Text className="text-md">Service</Text>
              <Text className="text-lg font-bold">{serviceData ? parseServiceType(serviceData.type) : null}</Text>
            </Box>
          </Box>
          <Divider my="2" _light={{ bg: '#4c8ab9' }} _dark={{ bg: '#4c8ab9' }} />
          <Box className="flex-wrap flex-row my-1">
            <Button className="rounded-3xl bg-white w-14 h-14 flex-start">
              <Ionicons size={30} color="#4c8ab9" className="ml-2" name="calendar"></Ionicons>
            </Button>
            <Box className="flex-end">
              <Text className="text-md">Date & Time</Text>
              <Text className="text-lg font-bold">{data.scheduledTime ? capitalizeWords(data.scheduledTime.day) : null}, {data.scheduledTime ? parseTime(data.scheduledTime.time) : null}</Text>
            </Box>
          </Box>
          <Divider my="2" _light={{ bg: '#4c8ab9' }} _dark={{ bg: '#4c8ab9' }} />
          <Box className="flex-wrap flex-row my-1">
            <Button className="rounded-3xl bg-white w-14 h-14 flex-start">
              <Ionicons size={30} color="#4c8ab9" className="ml-2" name="layers"></Ionicons>
            </Button>
            <Box className="flex-end">
              <Text className="text-md">Frequency</Text>
              <Text className="text-lg font-bold">{data.scheduledTime ? parseBookingFrequency(data.scheduledTime.frequency) : null}</Text>
            </Box>
          </Box>
          <Divider my="2" _light={{ bg: '#4c8ab9' }} _dark={{ bg: '#4c8ab9' }} />
          <Box className="flex-wrap flex-row my-1">
            <Button className="rounded-3xl bg-white w-14 h-14 flex-start">
              <Ionicons size={30} color="#4c8ab9" className="ml-2" name="pricetag"></Ionicons>
            </Button>
            <Box className="flex-end">
              <Text className="text-md">Price</Text>
              <Text className="text-lg font-bold">£{serviceData?.price}</Text>
            </Box>
          </Box>
          <Box className="flex-wrap flex-row mt-2 mb-10">
            <Button className="ml-auto rounded-2xl">Reschedule</Button>
            <Button className="mx-2 rounded-2xl">Cancel</Button>
            <Button className="mr-auto rounded-2xl" onPress={() => router.push('/review')}>Review</Button>
          </Box>
        </Box>
      </Box>
      
    </ScrollView>
  )
}
