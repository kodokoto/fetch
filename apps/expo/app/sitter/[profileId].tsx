import { Image, View, Text } from 'react-native'
import { Button, Box, NativeBaseProvider } from 'native-base'
import React from 'react'
import SitterProfileLocation from 'app/components/SitterProfileLocation'
import ProfileRating from 'app/components/ProfileRating'
import SitterProfileNextAvailable from 'app/components/SitterProfileNextAvaliable'
import { useRouter, useSearchParams } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import { api } from 'app/utils/trpc'

export default function SitterProfile() {
  const { userId, service, date, availability, dateTime } = useSearchParams()
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const email = user?.primaryEmailAddress.emailAddress


  const {data: sitterUser, error: sitterError, isLoading: isLoadingSitter } = api.sitter.byId.useQuery(Number(userId))

  const currentUserId = user?.id
  const mockSitter = {
    name: 'Leonard Lungu',
    rating: 4,
    location: 'London, UK',
    services: ['Dog Walking', 'Dog Sitting', 'Pet Feeding'],
    about:
      'I am a dog lover and I have a dog of my own. I have been dog sitting for 5 years and I have experience with all types of dogs. I am a very active person and I love to take dogs on walks and play with them. I am also very responsible and I will make sure your dog is safe and happy while you are away.',
    //does that data structure suck? yes. but it's the best I could come up with
    available: [
      [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
        true,
        true,
        false,
        false,
        false,
        true,
        true,
        false,
        false,
        true,
        false,
        false,
        false,
      ],
      [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
    ],
  }

  return (
    <NativeBaseProvider>
      <View>
        <View className="flex-row">
          <View></View>
          <View>
            <Text className="text-orange">{sitterUser.name}</Text>
            <Text>Pet Sitter</Text>
            <ProfileRating />
          </View>
        </View>
        <View className="flex-row">
          <Text className="text-2xl">About me</Text>

          {/* redirects user to booking page */}
          <Button className="border-gray-500 border-2 bg-white"
            onPress={() =>
              router.push({
                pathname: '/booking/addBooking',
                params: {
                  sitterId: userId,
                  date: date,
                  availability: availability,
                  dateTime: dateTime,
                  service: service
                },
              })
            }>
            <Text className="text-black-500">Book</Text>
          </Button>
          {/* redirects user to messaging page */}
          <Button
            onPress={() =>
              router.push({
                pathname: '/messages',
                params: {
                  senderId: currentUserId,
                  receiverId: userId,
                  receiverName: sitterUser.name,
                  receiverImageUrl: sitterUser.imageUrl,
                },
              })
            }
            className="border-gray-500 border-2 bg-white"
          >
            <Text className="text-black-500">Message</Text>
          </Button>
          {/* redirects user to report page */}
          <Button className="border-gray-500 border-2 bg-white">
            <Text className="text-red-500">Report</Text>
          </Button>
        </View>

        <View>
          <Box className="border-2">
            {mockSitter.about ? <Text>{mockSitter.about}</Text> : <Text>No bio provided</Text>}
          </Box>

          <Text className="text-xl">Services I offer</Text>
          <Box className="border-2">
            {mockSitter.services ? (
              mockSitter.services.map((service, i) => {
                return <Text key={i}>{service}</Text>
              })
            ) : (
              <Text>No services provided</Text>
            )}
          </Box>
        </View>
        <SitterProfileLocation {...mockSitter} />

        <SitterProfileNextAvailable {...mockSitter} />
      </View>
    </NativeBaseProvider>
  )
}
