import { ScrollView, Text, View, Box } from 'native-base'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import ProfileIcon from 'app/components/ProfileIcon'
import WelcomeMessage from 'app/components/WelcomeMessage'
import SitterBookingPreview from 'app/components/SitterBookingPreview'
import AcceptBooking from '../components/AcceptBooking'
import { Link, useRouter, useSearchParams } from 'expo-router'
import { api } from 'app/utils/trpc'

export default function SitterHomeScreen() {

  const { user, isLoaded } = useUser();
  const router = useRouter();
  const userId = user?.id

  const { data: sitterProfile, isLoading: sitterProfileLoading } = api.sitter.byUserId.useQuery(userId, {
    enabled: !!userId,
    cacheTime: 0,
  });
  
  const { data: bookings, isLoading: bookingsLoading } = api.booking.bySitterId.useQuery(sitterProfile?.id, {
    enabled: !!sitterProfile?.id,
    cacheTime: 0,
  })

  if (!isLoaded) return null
  if (bookingsLoading) return <Text>Loading...</Text>

  return (
    <ScrollView>
      <View className='m-4'>
      {/* <Text>Sitter Home Screen</Text> */}
      <Box className="flex-row justify-between my-8">
          <WelcomeMessage name={sitterProfile.name} />
          <View className=' justify-center'>
            <ProfileIcon iconUrl={sitterProfile.imageUrl} />
          </View>
        </Box>
      <Text className="font-bold text-xl ml-8 mb-8">Upcoming Bookings</Text>
        {
          bookings && bookings.length > 0 
          ? bookings.filter((booking) => booking.status === "ACCEPTED")
                    .map((booking, index) => <SitterBookingPreview key={index} {...booking} />)
          : <Text className='ml-8'>You have no upcoming bookings</Text>
        }
        <Text className="font-bold text-xl ml-8 my-8">Pending Bookings</Text>
        {
          bookings && bookings.length > 0 
          ? bookings.filter((booking) => booking.status === "PENDING")
                    .map((booking, index) => <SitterBookingPreview key={index} {...booking} />)
          : <Text className='ml-8'>You have no pending bookings</Text>
        }
      </View>
    </ScrollView>
  )
}