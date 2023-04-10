import { View, Text } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Box } from 'native-base'
import ProfileIcon from 'app/components/ProfileIcon'
import WelcomeMessage from 'app/components/WelcomeMessage'
import BookingPreview from 'app/components/BookingPreview'
import OwnerHomeScreen from './OwnerHomeScreen'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'
import { api } from 'app/utils/trpc'

export default function SitterHomeScreen() {
  
  const { user, isLoaded } = useUser();
  const userId = user?.id

  const [session, setSession] = useAtom(sessionAtom);

  const { data: owner } = api.owner.byUserId.useQuery(userId, {enabled: !!userId, cacheTime: 0});
  const { data: sitterProfile, isLoading: sitterProfileLoading } = owner ? api.owner.byUserId.useQuery(userId, {
    enabled: !!userId,
    cacheTime: 0,
  }) : api.sitter.byUserId.useQuery(userId, {
    enabled: !!userId,
    cacheTime: 0,
  });
  const { data: bookings, isLoading: bookingsLoading } = api.booking.byOwnerId.useQuery(sitterProfile?.id, {
    enabled: !!sitterProfile?.id,
  })

  if (!isLoaded) return null
  if (bookingsLoading) return <Text>Loading...</Text>

  if(Profile.OWNER){
    session.currentProfile = Profile.SITTER;
    session.sitterId = Number(sitterProfile.id);
  }

  console.log("Home Session: " + JSON.stringify(session));

  if(owner){
    return <OwnerHomeScreen />
  } else {

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
}