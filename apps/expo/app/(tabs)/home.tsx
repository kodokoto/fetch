import { View, Text } from 'react-native'
import { Box } from 'native-base'
import React from 'react'
import ProfileIcon from 'app/components/ProfileIcon'
import WelcomeMessage from 'app/components/WelcomeMessage'
import BookingPreview from 'app/components/BookingPreview'
import { useUser } from '@clerk/clerk-expo'
import { api } from 'app/utils/trpc'
import { Redirect, useRouter } from 'expo-router'

export default function Home() {
  console.log('rerender')
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isLoaded, user } = useUser()
  const userId = user?.id
  const router = useRouter()

  const { data: ownerProfile, isLoading: ownerProfileLoading } = api.owner.byUserId.useQuery(userId, { enabled: !!userId });
  const { data: sitterProfile, isLoading: sitterProfileLoading } = api.sitter.byUserId.useQuery(userId, { enabled: !!userId });
  const { data: bookings, isLoading: bookingsLoading } = api.booking.byOwnerId.useQuery(ownerProfile?.id, { enabled: !!ownerProfile?.id })

  if (!isLoaded) return null

  if (!!ownerProfileLoading || !!sitterProfileLoading) return <Text>Loading...</Text>
  if (!ownerProfile && !sitterProfile) {
    return <Redirect href="/create" />
  }

  if (bookingsLoading) return <Text>Loading...</Text>

  return (
    <View>
      <Box className="flex-wrap flex-row">
        <WelcomeMessage name={ownerProfile.name} />
        <ProfileIcon iconUrl={ownerProfile.imageUrl} />
      </Box>
      <Text className="font-bold text-xl ml-2">Upcoming Appointments</Text>
      {
        bookings.map((booking, index) => <BookingPreview key={index} {...booking} />)
      }
    </View>
  )
}
