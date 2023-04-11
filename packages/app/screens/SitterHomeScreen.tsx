import { ScrollView, Text, Button, Box } from 'native-base'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import ProfileIcon from 'app/components/ProfileIcon'
import WelcomeMessage from 'app/components/WelcomeMessage'
import SitterBookingPreview from 'app/components/SitterBookingPreview'
import AcceptBooking from '../components/AcceptBooking.'
import { Link, useRouter, useSearchParams } from 'expo-router'
import { api } from 'app/utils/trpc'

export default function SitterHomeScreen() {

  const { user, isLoaded } = useUser();
  const router = useRouter();
  const userId = user?.id

  const mutation = api.service.create.useMutation();

  const { data: sitterProfile, isLoading: sitterProfileLoading } = api.sitter.byUserId.useQuery(userId, {
    enabled: !!userId,
    cacheTime: 0,
  });
  
  const { data: bookings, isLoading: bookingsLoading } = api.booking.bySitterId.useQuery(sitterProfile?.id, {
    enabled: !!sitterProfile?.id,
  })


  if (!isLoaded) return null
  if (bookingsLoading) return <Text>Loading...</Text>

  return (
    <ScrollView>
      {/* <Text>Sitter Home Screen</Text> */}
      <Box className="flex-wrap flex-row">
        <WelcomeMessage name={sitterProfile.name} />
        <ProfileIcon iconUrl={sitterProfile.imageUrl} />
      </Box>
      <Text className="font-bold text-xl ml-2 mb-2">Upcoming Bookings</Text>
      {bookings && bookings
      .filter((booking) => booking.status === "ACCEPTED")
      .map((booking, index) => <SitterBookingPreview key={index} {...booking} />)}
      <Text className="font-bold text-xl ml-2">Pending Bookings</Text>
      {bookings && bookings
      .filter((booking) => booking.status === "PENDING")
      .map((booking, index) => <AcceptBooking key={index} {...booking} />)}
    </ScrollView>
  )
}