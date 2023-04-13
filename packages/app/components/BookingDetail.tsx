import { useRouter } from 'expo-router'
import { Text } from 'react-native'
import { Button, Box, Divider, Avatar, ScrollView } from 'native-base'
import { Ionicons, Entypo, Foundation } from '@expo/vector-icons'
import React from 'react'
import { Booking } from '@prisma/client'
import { api } from '../utils/trpc'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'
import { useSearchParams } from 'expo-router'
import { parseBookingFrequency, capitalizeWords, parseServiceType, parseTime } from '../utils/helpers'
import DisplayCardList from 'app/components/DisplayCardList'
import PetDisplayCard from 'app/components/PetDisplayCard'
import { Pet } from 'db'

function serviceTypeToIcon(serviceType: string) {
  switch(serviceType) {
    case "WALK":
      return <Foundation name="guide-dog" size={36} color="#3b82f6" />
    case "PET_CARE":
      return <Ionicons name="logo-octocat" size={36} color="#3b82f6" />
    case "HOUSE_SITTING":
      return <Entypo name="home" size={36} color="#3b82f6" /> 
  }
}


export default function BookingDetail(props: Booking) {
  const [session, _] = useAtom(sessionAtom)
  const router = useRouter()
  const { data: sitterData} = api.sitter.byId.useQuery(String(props.sitterId))
  const {data: serviceData} = api.service.byId.useQuery(props.serviceId)
  const {data: petData} = api.pet.byBookingId.useQuery(props.id)
  const [pets, setPets] = React.useState([] as Pet[])
  const { isLoading } = api.pet.byBookingId.useQuery(props.id, { cacheTime: 0, onSuccess: setPets})
  const { data } = api.booking.byIdWithScheduledTime.useQuery({
    id: props.id,
    include: 'scheduledTime',
  })
 
  const mutationDelete = api.booking.delete.useMutation()

  const handleCancelBooking = () => {
    
    mutationDelete.mutate(props.id)
    router.push({
      pathname: '/home',
  })}

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

  return (
    <ScrollView className='bg-white'>
      <Box className="m-6">
        <Box className="flex-wrap flex-row my-4 justify-between">
          <Button className='bg-transparent flex-start' onPress={() =>
            router.push({
              pathname: `/sitter/${sitterData.id}`,
            })
          }>
            <Avatar className="w-16 h-16" source={{ uri: sitterData?.imageUrl }}/>
          </Button>
          <Box className="mr-10 mt-3">
            <Text className="text-2xl font-bold">{sitterData?.name}</Text>
            <Text className="text-lg">Booking Status: {capitalizeWords(props.status)}</Text>
          </Box>
        </Box>
        <Box >
          <Box className="flex-wrap flex-row my-1">
            <Button className="rounded-3xl bg-white w-14 h-14 flex-start">
              <Ionicons size={30} color="#3b82f6" className="ml-2" name="card-outline"></Ionicons>
            </Button>
            <Box className="flex-end">
              <Text className="text-md">Price</Text>
              <Text className="text-lg font-bold">£{serviceData?.price}</Text>
            </Box>
          </Box>
          <Box className="flex-wrap flex-row my-1">
            <Button className="rounded-3xl bg-white w-14 h-14 flex-start">
              <Ionicons size={30} color="#3b82f6" className="ml-2" name="calendar"></Ionicons>
            </Button>
            <Box className="flex-end">
              <Text className="text-md">Date & Time</Text>
              <Text className="text-lg font-bold">{data.scheduledTime ? capitalizeWords(data.scheduledTime.day) : null}, {data.scheduledTime ? parseTime(data.scheduledTime.time) : null}</Text>
            </Box>
          </Box>
          <Box className="flex-wrap flex-row my-1">
            <Button className="rounded-3xl bg-white w-14 h-14 flex-start">
              <Ionicons size={30} color="#3b82f6" className="ml-2" name="location"></Ionicons>
            </Button>
            <Box className="flex-end">
              <Text className="text-md">Location</Text>
              <Text className="text-lg font-bold">{sitterData?.location}</Text>
            </Box>
          </Box>
          <Box className="flex-wrap flex-row my-1">
            <Button className="rounded-3xl bg-white w-14 h-14 flex-start">
              {serviceTypeToIcon(serviceData? serviceData.type : null)}
            </Button>
            <Box className="flex-end">
              <Text className="text-md">Service</Text>
              <Text className="text-lg font-bold">{serviceData ? parseServiceType(serviceData.type) : null}</Text>
            </Box>
          </Box>
          <Box className="flex-wrap flex-row my-1">
            <Button className="rounded-3xl bg-white w-14 h-14 flex-start">
              <Ionicons size={30} color="#3b82f6" className="ml-2" name="layers"></Ionicons>
            </Button>
            <Box className="flex-end">
              <Text className="text-md">Frequency</Text>
              <Text className="text-lg font-bold">{data.scheduledTime ? parseBookingFrequency(data.scheduledTime.frequency) : null}</Text>
            </Box>
          </Box>
          <Box className="flex-wrap flex-row">
            <Button className="rounded-3xl bg-white w-14 h-14 flex-start mt-4">
              <Ionicons className="mx-auto ml-2" size={30} color="#3b82f6" name="paw"></Ionicons>
            </Button>
            <Box className="flex-end">
                <DisplayCardList 
                  Card={PetDisplayCard} 
                  value={pets} 
                />
            </Box>
          </Box>
          <Box className="flex-wrap flex-row mt-2 mb-10">
            <Button className="mx-2 rounded-2xl"
            onPress={() =>
            router.push({
              pathname: '/edit/booking',
              params: {
                bookingId: props.id,
                ownerId: props.ownerId,
                sitterId: props.sitterId,
                scheduledTimeId: data.scheduledTime.id,
                day: data.scheduledTime.day,
                timeOfDay: data.scheduledTime.time,
              }
            })}
            >
              Edit details
            </Button>
            <Button
              className="mx-2 rounded-2xl"
              onPress={() => router.push({
                pathname: '/edit/scheduledTime',
                params: {
                  bookingId: props.id,
                //   ownerId: props.ownerId,
                //   sitterId: props.sitterId,
                //   scheduledTimeId: data.scheduledTime.id,
                //   day: data.scheduledTime.day,
                //   timeOfDay: data.scheduledTime.time,
                }
              })}
            >
              Reschedule
            </Button>
            {
              session.currentProfile === Profile.OWNER
              ?  <Button 
                  className="mx-2 rounded-2xl" 
                  onPress={() => router.push('/review')}
                >
                  Review
                </Button>
              : console.log("not owner")
            }
            <Button className="mx-2 rounded-2xl"
              onPress = {handleCancelBooking}
            >
              Cancel Booking
            </Button>
            
            </Box>
        </Box>
      </Box>
      
    </ScrollView>
  )
}