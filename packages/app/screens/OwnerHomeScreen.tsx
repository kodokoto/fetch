import { View, Text } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Box } from 'native-base'
import ProfileIcon from 'app/components/ProfileIcon'
import WelcomeMessage from 'app/components/WelcomeMessage'
import BookingPreview from 'app/components/BookingPreview'
import { api } from 'app/utils/trpc'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'
import SitterHomeScreen from './SitterHomeScreen'

export default function OwnerHomeScreen() {
  
  const { user, isLoaded } = useUser();
  const userId = user?.id
  const [session, setSession] = useAtom(sessionAtom);
  const { data: sitter } = api.sitter.byUserId.useQuery(userId, {enabled: !!userId, cacheTime: 0});

  const { data: ownerProfile, isLoading: ownerProfileLoading } = !sitter ? api.owner.byUserId.useQuery(userId, {
    enabled: !!userId,
    cacheTime: 0,
  }) : api.sitter.byUserId.useQuery(userId, {
    enabled: !!userId,
    cacheTime: 0,
  });
  const { data: bookings, isLoading: bookingsLoading } = api.booking.byOwnerId.useQuery(ownerProfile?.id, {
    enabled: !!ownerProfile?.id,
  })

  if (!isLoaded) return null
  if (bookingsLoading) return <Text>Loading...</Text>

  if(Profile.SITTER){
    console.log("12345678: " + user.id);
    session.currentProfile = Profile.OWNER;
    session.ownerId = Number(ownerProfile.id);
    console.log(session.ownerId)
  }

  if(sitter){
    return <SitterHomeScreen />
  } else {
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
}