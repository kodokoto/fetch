import { View, Text, Button, Box } from 'native-base'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import ProfileIcon from 'app/components/ProfileIcon'
import WelcomeMessage from 'app/components/WelcomeMessage'
import BookingPreview from 'app/components/BookingPreview'
import OwnerHomeScreen from './OwnerHomeScreen'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'
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
  
  const { data: bookings, isLoading: bookingsLoading } = api.booking.byOwnerId.useQuery(sitterProfile?.id, {
    enabled: !!sitterProfile?.id,
  })

  const handleFakeSubmit = () => {
      mutation.mutateAsync({
        sitterId: sitterProfile.id,
        type: "WALK",
        price: 0,
        petType: "DOG",
        duration: 0,
        description: "This is a fake service",
        availableTimes: [
          {
            day: "MONDAY",
            time: "MORNING",
          },
          {
            day: "SUNDAY",
            time: "EVENING",
          },
        ],
      }).then(() => {
        console.log("success")
      })
  }



  if (!isLoaded) return null
  if (bookingsLoading) return <Text>Loading...</Text>

  return (
    <View>
      <Text>Sitter Home Screen</Text>
      <Box className="flex-wrap flex-row">
        <WelcomeMessage name={sitterProfile.name} />
        <ProfileIcon iconUrl={sitterProfile.imageUrl} />
      </Box>
      <Button onPress={() => router.push('/create/service')}> Create Service </Button>
      <Text className="font-bold text-xl ml-2">Upcoming Appointments</Text>
      {bookings && bookings.map((booking, index) => <BookingPreview key={index} {...booking} />)}
    </View>
  )
}