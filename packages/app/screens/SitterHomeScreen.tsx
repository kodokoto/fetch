import { View, Text } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Box } from 'native-base'
import ProfileIcon from 'app/components/ProfileIcon'
import WelcomeMessage from 'app/components/WelcomeMessage'
import BookingPreview from 'app/components/BookingPreview'
import { api } from 'app/utils/trpc'

export default function SitterHomeScreen() {
  
  const { user, isLoaded } = useUser();
  const userId = user?.id
  const { data: sitterProfile, isLoading: sitterProfileLoading } = api.sitter.byUserId.useQuery(userId, {
    enabled: !!userId,
    cacheTime: 0,
  })
  const { data: bookings, isLoading: bookingsLoading } = api.booking.byOwnerId.useQuery(sitterProfile?.id, {
    enabled: !!sitterProfile?.id,
  })

  if (!isLoaded) return null
  if (bookingsLoading) return <Text>Loading...</Text>

  return (
    <View>
      <Text>SItter Home Screen</Text>
      <Box className="flex-wrap flex-row">
        <WelcomeMessage name={sitterProfile.name} />
        <ProfileIcon iconUrl={sitterProfile.imageUrl} />
      </Box>
      <Text className="font-bold text-xl ml-2">Upcoming Appointments</Text>
      {bookings && bookings.map((booking, index) => <BookingPreview key={index} {...booking} />)}
    </View>
  )
}