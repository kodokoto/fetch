import { useRouter } from 'expo-router'
import { Text } from 'react-native'
import { Button, Box, Divider, Avatar } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'

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

export default function BookingDetail(props: AppointmentDetailProps) {
    const router = useRouter()
  
    const handleMessagePress = () => {
        router.push({
            pathname: '/DirectMessages',
            params: {
                username: props.username,
                mostRecentMessage: props.mostRecentMessage,
            },
        })
    }
  
    return (
      <>
        <Avatar
          className="mx-auto mt-28 mb-20 w-32 h-32"
          source={{ uri: props.imageUrl }}
        ></Avatar>
        <Box className="rounded-2xl border-[#4c8ab9] border-solid border-2 bg-slate-100 h-116">
          <Box className="flex-wrap flex-row my-4 justify-between">
            <Box className="flex-start">
              <Text className="text-2xl font-bold ml-4">{props.sitterName}</Text>
              <Text className="text-lg ml-4">{props.appointment}</Text>
            </Box>
            <Button
              className="bg-white w-14 h-14 rounded-3xl flex-end mr-4"
              onPress={handleMessagePress}
            >
              <Ionicons size={28} color="#4c8ab9" name="chatbubble"></Ionicons>
            </Button>
          </Box>
          <Box className="rounded-2xl bg-white border-[#4c8ab9] border-solid border-2">
            <Box className="flex-wrap flex-row mt-4 mb-1">
              <Button className="rounded-3xl bg-white w-14 h-14 flex-start">
                <Ionicons
                  className="mx-auto ml-2"
                  size={30}
                  color="#4c8ab9"
                  name="paw"
                ></Ionicons>
              </Button>
              <Box className="flex-end">
                <Text className="text-md">Pet</Text>
                <Text className="text-lg font-bold">{props.pet}</Text>
              </Box>
            </Box>
            <Divider
              my="2"
              _light={{ bg: '#4c8ab9' }}
              _dark={{ bg: '#4c8ab9' }}
            />
            <Box className="flex-wrap flex-row my-1">
              <Button className="rounded-3xl bg-white w-14 h-14 flex-start">
                <Ionicons
                  size={30}
                  color="#4c8ab9"
                  className="ml-2"
                  name="calendar"
                ></Ionicons>
              </Button>
              <Box className="flex-end">
                <Text className="text-md">Date & Time</Text>
                <Text className="text-lg font-bold">
                  {props.dateDescription} {props.timeDescription}
                </Text>
              </Box>
            </Box>
            <Divider
              my="2"
              _light={{ bg: '#4c8ab9' }}
              _dark={{ bg: '#4c8ab9' }}
            />
            <Box className="flex-wrap flex-row my-1">
              <Button className="rounded-3xl bg-white w-14 h-14 flex-start">
                <Ionicons
                  size={30}
                  color="#4c8ab9"
                  className="ml-2"
                  name="pricetag"
                ></Ionicons>
              </Button>
              <Box className="flex-end">
                <Text className="text-md">Price</Text>
                <Text className="text-lg font-bold">£{props.price}</Text>
              </Box>
            </Box>
            <Box className="flex-wrap flex-row mt-2 mb-10">
              <Button className="ml-auto rounded-2xl">Reschedule</Button>
              <Button className="mr-auto ml-2 rounded-2xl">Cancel</Button>
            </Box>
          </Box>
        </Box>
      </>
    )
  }
  