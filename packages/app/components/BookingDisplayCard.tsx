//Import @React-navigation/native
import { useRouter } from 'expo-router'
import { Image, Text, View } from 'react-native'
import { Button, Box, FormControl, Avatar } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Booking } from '@prisma/client'
import { api } from '../utils/trpc'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'
import { parseBookingFrequency, parseTime, capitalizeWords } from '../utils/helpers'
import { EditableDisplayCard } from './DisplayCardList'

export default function BookingDisplayCard(props: EditableDisplayCard<Booking>) {
  const router = useRouter()
  console.log(props)
  const [session, _] = useAtom(sessionAtom)

  const { data: userData, isLoading: userDataIsLoading } =
    session.currentProfile === Profile.SITTER
      ? api.owner.byId.useQuery(String(props.value.ownerId))
      : api.sitter.byId.useQuery(String(props.value.sitterId))
  const { data, isLoading } = api.booking.byIdWithScheduledTime.useQuery({
    id: props.value.id,
    include: 'scheduledTime',
  })

  const { data: petData, isLoading: petDataIsLoading } = api.pet.byBookingId.useQuery(props.value.id)

  const handlePress = () => {
    router.push({
      pathname: `/booking/${props.value.id}`,
      params: { bookingId: props.value.id },
    })
  }

  if (isLoading) return <Text>Loading...</Text>
  if (petDataIsLoading) return <Text>Loading...</Text>
  return (
    <Button onPress={handlePress} className="w-10/12 mx-auto rounded-3xl bg-gray-100 shadow-sm p-4 py-0 my-4">
      <View className="flex-col ">
        <Box className="rounded-2xl p-4 w-80 h-25 mb-2 flex-wrap flex-row justify-between">
          <Box className="ml-2" style={{ flexDirection: 'row' }}>
            <Avatar source={{ uri: userData?.imageUrl }} className="w-12 h-12 md:w-48 md:h-auto float-left" />
            <Box className="ml-4 float-left">
              <Text className="font-bold text-lg">{userData?.name}</Text>
              <Text>{petData ? petData.map((pet) => pet.name).join(', ') : null}</Text>
            </Box>
          </Box>
          <Text className="mr-4">
            {data?.scheduledTime ? parseBookingFrequency(data.scheduledTime.frequency) : null}
          </Text>
        </Box>
        <Box className="ml-4 flex-wrap flex-row justify-between w-10/12 mx-auto">
          <View className="flex-row justify-center items-center">
            <Ionicons size={24} className="flex-start" name="ios-calendar-outline"></Ionicons>
            <Text className="mx-2 text-md">{data?.scheduledTime ? capitalizeWords(data.scheduledTime.day) : null}</Text>
          </View>
          <View className="flex-row justify-center items-center">
            <Ionicons size={24} name="ios-time-outline"></Ionicons>
            <Text className="mx-2 text-md">{data?.scheduledTime ? parseTime(data.scheduledTime.time) : null}</Text>
          </View>
        </Box>
      </View>
      <View className="flex-row mt-4 mx-auto">
        {session.currentProfile === Profile.SITTER && props.value.status === 'PENDING' ? (
          <>
            <Button
              className="bg-[#50dc64] w-[47%] m-0 rounded-none rounded-bl-3xl"
              onPress={() => props.onEdit(props.value)}
            >
              <Text>Accept</Text>
            </Button>
            <Button
              className="bg-[#fc511c] w-[47%] m-0 rounded-none rounded-br-3xl"
              onPress={() => props.onDelete(props.value)}
            >
              <Text>Deny</Text>
            </Button>
          </>
        ) : null}
      </View>
    </Button>
  )
}
