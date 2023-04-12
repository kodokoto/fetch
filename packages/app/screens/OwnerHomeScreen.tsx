import { View, Text } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Box, ScrollView, Button } from 'native-base'
import { useRouter } from 'expo-router'
import ProfileIcon from 'app/components/ProfileIcon'
import WelcomeMessage from 'app/components/WelcomeMessage'
import { api } from 'app/utils/trpc'
import { router } from 'api/src/trpc'
import BookingDisplayCard from '../components/BookingDisplayCard'

export default function OwnerHomeScreen() {

  const { user, isLoaded } = useUser();
  const userId = user?.id

  const { data: ownerProfile, isLoading: ownerProfileLoading } = api.owner.byUserId.useQuery(userId, {
    enabled: !!userId,
    cacheTime: 0,
  })
  const { data: bookings, isLoading: bookingsLoading } = api.booking.byOwnerId.useQuery(ownerProfile?.id, {
    enabled: !!ownerProfile?.id,
    cacheTime: 0,
  })

  if (!isLoaded) return null
  if (bookingsLoading) return <Text>Loading...</Text>


  return (
    <ScrollView>
      <View className='m-4'>
        <Box className="flex-row justify-between my-8">
          <WelcomeMessage name={ownerProfile.name} />
          <View className=' justify-center'>
            <ProfileIcon iconUrl={ownerProfile.imageUrl} />
          </View>
        </Box>
        <Text className="font-bold text-xl ml-8 mb-8">Upcoming Bookings</Text>
        {
          bookings && bookings.length > 0 
          ? bookings.filter((booking) => booking.status === "ACCEPTED")
                    .map((booking, index) => <BookingDisplayCard key={index} value={booking} />)
          : <Text className='ml-8'>You have no upcoming bookings</Text>
        }
        <Text className="font-bold text-xl ml-8 my-8">Pending Bookings</Text>
        {
          bookings && bookings.length > 0 
          ? bookings.filter((booking) => booking.status === "PENDING")
                    .map((booking, index) => <BookingDisplayCard key={index} value={booking} />)
          : <Text className='ml-8'>You have no pending bookings</Text>
        }
      </View>
    </ScrollView>
  )
}
