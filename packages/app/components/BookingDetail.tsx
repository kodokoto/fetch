import { useRouter } from 'expo-router'
import { Text } from 'react-native'
import { Button, Box, Divider, Avatar, ScrollView, Menu, View } from 'native-base'
import { Ionicons, Entypo, Foundation } from '@expo/vector-icons'
import React from 'react'
import { Booking } from '@prisma/client'
import { api } from '../utils/trpc'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'
import { parseBookingFrequency, capitalizeWords, parseServiceType, parseTime } from '../utils/helpers'
import PetDisplayCard from 'app/components/PetDisplayCard'

function serviceTypeToIcon(serviceType: string) {
  switch (serviceType) {
    case 'WALK':
      return <Foundation name="guide-dog" size={36} color="#3b82f6" />
    case 'PET_CARE':
      return <Ionicons name="logo-octocat" size={36} color="#3b82f6" />
    case 'HOUSE_SITTING':
      return <Entypo name="home" size={36} color="#3b82f6" />
  }
}

export default function BookingDetail(props: Booking) {
  const [session, _] = useAtom(sessionAtom)
  const router = useRouter()

  const { data : userData, isLoading: isLoadedUserData } = session.currentProfile === Profile.SITTER 
  ? api.owner.byId.useQuery(props.ownerId)
  : api.sitter.byId.useQuery(props.sitterId)

  const { data: serviceData } = api.service.byId.useQuery(props.serviceId)
  const [pet, setPet] = React.useState()
  const { isLoading: isLoadingPet } = api.pet.byId.useQuery(props.id, {
    onSuccess: setPet,
  })
  const { data, isLoading: isLoadingData } = api.booking.byIdWithScheduledTime.useQuery({
    id: props.id,
    include: 'scheduledTime',
  })

  const mutationDelete = api.booking.delete.useMutation()

  const handleCancelBooking = () => {
    mutationDelete.mutate({
      id: props.id,
    })
    router.push({
      pathname: '/home',
    })
  }

  const handleRescheduleBooking = () =>
    router.push({
      pathname: '/edit/scheduledTime',
      params: {
        bookingId: props.id,
        ownerId: props.ownerId,
        sitterId: props.sitterId,
        scheduledTimeId: data.scheduledTime.id,
        day: data.scheduledTime.day,
        timeOfDay: data.scheduledTime.time,
      },
    })

  const handleManageBooking = () =>
    router.push({
      pathname: '/edit/booking',
      params: {
        bookingId: props.id,
        ownerId: props.ownerId,
        sitterId: props.sitterId,
        scheduledTimeId: data.scheduledTime.id,
        day: data.scheduledTime.day,
        timeOfDay: data.scheduledTime.time,
      },
    })

  if (isLoadingPet || isLoadingData || isLoadedUserData) {
    return <Text>Loading...</Text>
  }

  return (
    <ScrollView className="bg-white">
      <Box className="m-6">
        <Box className="flex-row my-4">
          <Button
            className="bg-transparent justify-center"
            onPress={() =>
              router.push({
                pathname: `/${Profile.OWNER === session.currentProfile ? "sitter": "owner"}/${userData.id}`,
              })
            }
          >
            <Avatar className="w-14 h-14" source={{ uri: userData?.imageUrl }} />
          </Button>
          <Box className="justify-center ">
            <Text className="text-xl font-bold">{userData?.name}</Text>
            <Text className="text-md">Booking Status: {capitalizeWords(props.status)}</Text>
          </Box>
          <View>
            <Menu
              className="mr-4"
              trigger={(triggerProps) => (
                <Button {...triggerProps} className="bg-transparent ml-12">
                  <Entypo name="dots-three-vertical" size={24} color="gray" />
                </Button>
              )}
            >
              <Menu.Item
                onPress={() => {
                  handleManageBooking()
                }}
              >
                Manage
              </Menu.Item>
              <Menu.Item
                onPress={() => {
                  handleRescheduleBooking()
                }}
              >
                Reschedule
              </Menu.Item>
            </Menu>
          </View>
        </Box>
        <Box>
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
              <Text className="text-lg font-bold">
                {data?.scheduledTime ? capitalizeWords(data.scheduledTime.day) : null},{' '}
                {data?.scheduledTime ? parseTime(data.scheduledTime.time) : null}
              </Text>
            </Box>
          </Box>
          <Box className="flex-wrap flex-row my-1">
            <Button className="rounded-3xl bg-white w-14 h-14 flex-start">
              <Ionicons size={30} color="#3b82f6" className="ml-2" name="location"></Ionicons>
            </Button>
            <Box className="flex-end">
              <Text className="text-md">Location</Text>
              <Text className="text-lg font-bold">{userData?.location}</Text>
            </Box>
          </Box>
          <Box className="flex-wrap flex-row my-1">
            <Button className="rounded-3xl bg-white w-14 h-14 flex-start">
              {serviceTypeToIcon(serviceData ? serviceData.type : null)}
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
              <Text className="text-lg font-bold">
                {data?.scheduledTime ? parseBookingFrequency(data?.scheduledTime.frequency) : null}
              </Text>
            </Box>
          </Box>
          <Box className="flex-wrap flex-row">
            <Button className="rounded-3xl bg-white w-14 h-14 flex-start mt-4">
              <Ionicons className="mx-auto ml-2" size={30} color="#3b82f6" name="paw"></Ionicons>
            </Button>
            <Box className="flex-end">
              <PetDisplayCard value={pet} />
            </Box>
          </Box>
          <Box className="flex-col gap-y-4 mt-4 mb-10">
            {session.currentProfile === Profile.OWNER ? (
              <Button className="mx-2 bg-blue-500 rounded-full" onPress={() => router.push({
                pathname: '/create/review',
                params: {
                  sitterId: userData.id,
                }
              })}>
                <Text className="text-white font-bold">Review</Text>
              </Button>
            ) : null}
            <Button className="mx-2 bg-[#fc511c] rounded-full" onPress={handleCancelBooking}>
              <Text className="text-white font-bold">Cancel Booking</Text>
            </Button>
          </Box>
        </Box>
      </Box>
    </ScrollView>
  )
}
