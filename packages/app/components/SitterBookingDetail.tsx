import { useRouter } from 'expo-router'
import { Text } from 'react-native'
import { Button, Box, Divider, Avatar, ScrollView } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Booking } from '@prisma/client'
import { api } from '../utils/trpc'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'
import { useSearchParams } from 'expo-router'
import { parseBookingFrequency, capitalizeWords, parseServiceType, parseTime } from '../utils/helpers'

export default function BookingDetail(props: Booking) {
  const [session, _] = useAtom(sessionAtom)
  const router = useRouter()
  const { redirectUrl } = useSearchParams()
  const [booking, setBooking] = React.useState({} as Booking)
  const { data: ownerData, error, isLoading } = api.owner.byId.useQuery(String(props.ownerId))
  const {data: serviceData} = api.service.byId.useQuery(props.serviceId)
  const {data: petData} = api.pet.byBookingId.useQuery(props.id)
  const { data } = api.booking.byIdWithScheduledTime.useQuery({
    id: props.id,
    include: 'scheduledTime',
  })
 
  const handleMessagePress = () => {
    router.replace({
      pathname: '/messages',
      params: {
        receiverId: props.sitterId,
        senderId: props.ownerId,
        receiverName: ownerData?.name,
      },
    })
  }
  const mutation = api.booking.delete.useMutation()

  const handleDeleteBooking = () => {
    console.log("Delete")
    mutation.mutateAsync({
      id: props.id
    }).then(() => {
      () => {
        redirectUrl 
        ? router.replace(String(redirectUrl))
        : router.replace('/home'),
        setBooking(null);
      }
    })
  }
  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>
  return (
    <ScrollView>
      <Avatar className="mx-auto mt-28 mb-20 w-32 h-32" source={{ uri: ownerData?.imageUrl }}>
        LB
      </Avatar>
      <Box className="rounded-2xl ml-auto mr-auto border-[#4c8ab9] border-solid border-2 bg-slate-100 h-116 w-96">
        <Box className="flex-wrap flex-row my-4 justify-between">
          <Box className="flex-start">
            <Text className="text-2xl font-bold ml-4">{ownerData?.name}</Text>
            <Text className="text-lg ml-4">{capitalizeWords(props.status)}</Text>
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
          </Box>
        </Box>
      </Box>
      
    </ScrollView>
  )
}
