import { View, Text } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Box } from 'native-base'
import ProfileIcon from 'app/components/ProfileIcon'
import WelcomeMessage from 'app/components/WelcomeMessage'
import BookingPreview from 'app/components/BookingPreview'
import { api } from 'app/utils/trpc'

export default function OwnerHomeScreen() {
  
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
    <View>
      <Text>Owner Home Screen</Text>
      <Box className="flex-wrap flex-row">
        <WelcomeMessage name={ownerProfile.name} />
        <ProfileIcon iconUrl={ownerProfile.imageUrl} />
      </Box>
      <Text className="font-bold text-xl ml-2">Upcoming Appointments</Text>
      {bookings && bookings.map((booking, index) => <BookingPreview key={index} {...booking} />)}
    </View>
  )
}