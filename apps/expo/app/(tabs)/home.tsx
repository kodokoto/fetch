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
  const { data, error, isLoading } = api.booking.byOwnerId.useQuery(ownerProfile?.id, { enabled: !!ownerProfile?.id })

  if (!isLoaded) return null

  console.log('checking if loading')
  if (ownerProfileLoading || sitterProfileLoading) return <Text>{user.id}</Text>
  console.log('finised loading')
  // if there is no owner profile or sitter profile, redirect to /create
  console.log("checking if profile exists ")
  if (!ownerProfile && !sitterProfile) {
    console.log("no profile exists")
    return <Redirect href="/create" />
  }

  console.log("finished loading")

  
  console.log('profile exists')
  if (isLoading) return <Text>Loading...</Text>




  // if (isLoading) return <Text>Loading...</Text>
  // if (error) return <Text>{error.message}</Text>
  console.log()

  return (
    <View>
      <Box className="flex-wrap flex-row">
        <WelcomeMessage name={ownerProfile.name} />
        <ProfileIcon iconUrl={ownerProfile.imageUrl} />
      </Box>
      <Text className="font-bold text-xl ml-2">Upcoming Appointments</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error.message}</Text>
      ) : (
        data.map((data, index) => <BookingPreview key={index} {...data} />)
      )}
    </View>
  )
}
