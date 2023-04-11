import { View, Text } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Box, ScrollView, Button } from 'native-base'
import { useRouter } from 'expo-router'
import ProfileIcon from 'app/components/ProfileIcon'
import WelcomeMessage from 'app/components/WelcomeMessage'
import BookingPreview from 'app/components/BookingPreview'
import { api } from 'app/utils/trpc'
import { router } from 'api/src/trpc'

export default function OwnerHomeScreen() {
  const router = useRouter()
  const { user, isLoaded } = useUser();
  const userId = user?.id
  const { data: ownerProfile, isLoading: ownerProfileLoading } = api.owner.byUserId.useQuery(userId, {
    enabled: !!userId,
    cacheTime: 0,
  })
  const { data: bookings, isLoading: bookingsLoading } = api.booking.byOwnerId.useQuery(ownerProfile?.id, {
    enabled: !!ownerProfile?.id,
  })

  if (!isLoaded) return null
  if (bookingsLoading) return <Text>Loading...</Text>


  return (
    <ScrollView>
      {/* <Text>Owner Home Screen</Text> */}
      <Box className="flex-wrap flex-row">
        <WelcomeMessage name={ownerProfile.name} />
        <ProfileIcon iconUrl={ownerProfile.imageUrl} />
      </Box>
      <Text className="font-bold text-xl ml-2 mb-2">Upcoming Bookings</Text>
      {bookings && bookings
      .filter((booking) => booking.status === "ACCEPTED")
      .map((booking, index) => <BookingPreview key={index} {...booking} />)}
      <Text className="font-bold text-xl ml-2">Pending Bookings</Text>
      {bookings && bookings
      .filter((booking) => booking.status === "PENDING")
      .map((booking, index) => <BookingPreview key={index} {...booking} />)}
      <Text className="font-bold text-xl ml-2 mb-2">Your Pets</Text>
      <Button className='h-12 rounded-full bg-blue-500 w-11/12 my-4 mx-auto' onPress={() => router.push({
        pathname: '/create/pet'
      })}>Add Pet</Button>
    </ScrollView>
  )
}
