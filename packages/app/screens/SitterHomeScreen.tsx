import { ScrollView, Text, View, Box } from 'native-base'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import ProfileIcon from 'app/components/ProfileIcon'
import WelcomeMessage from 'app/components/WelcomeMessage'
import { useRouter, useSearchParams } from 'expo-router'
import { api } from 'app/utils/trpc'
import DisplayCardList from '../components/DisplayCardList'
import BookingDisplayCard from '../components/BookingDisplayCard'

export default function SitterHomeScreen() {

  const { user, isLoaded } = useUser();
  const router = useRouter();
  const userId = user?.id

  const deleteBooking = api.booking.delete.useMutation()
  const updateBookingStatus = api.booking.updateStatus.useMutation()

  const [upcomingBookings, setUpcomingBookings] = React.useState([])
  const [pendingBookings, setPendingBookings] = React.useState([])
  const { data: sitterProfile, isLoading: sitterProfileLoading } = api.sitter.byUserId.useQuery(userId, {
    enabled: !!userId,
    cacheTime: 0,
  });
  
  const { data: bookings, isLoading: bookingsLoading } = api.booking.bySitterId.useQuery(sitterProfile?.id, {
    enabled: !!sitterProfile?.id,
    cacheTime: 0,
    onSuccess: (data) => {
      const upcomingBookings = data.filter((booking) => booking.status === "ACCEPTED")
      const pendingBookings = data.filter((booking) => booking.status === "PENDING")
      setUpcomingBookings(upcomingBookings)
      setPendingBookings(pendingBookings)
    },
  })

  const handleAcceptPending = (booking) => {
    updateBookingStatus.mutateAsync({ id: booking.id, status: "ACCEPTED" }).then(() => {
      setPendingBookings((p) => p.filter((b) => b.id !== booking.id))
      setUpcomingBookings((prev) => [...prev, booking])
    })
  } 

  const handleDeclinePending = (booking) => {
    deleteBooking.mutateAsync({
      id: booking.id,
    })
    setPendingBookings(pendingBookings.filter((b) => b.id !== b.id))
  }


  if (!isLoaded) return null
  if (bookingsLoading) return <Text>Loading...</Text>

  return (
    <ScrollView>
      <View className='m-4'>
      <Box className="flex-row justify-between my-8">
          <WelcomeMessage name={sitterProfile.name} />
          <View className=' justify-center'>
            <ProfileIcon iconUrl={sitterProfile.imageUrl} />
          </View>
        </Box>
        <Text className="font-bold text-xl ml-8 mb-8">Upcoming Bookings</Text>
        {
         upcomingBookings.length > 0 
          ? upcomingBookings.filter((booking) => booking.status === "ACCEPTED")
                    .map((booking, index) => <BookingDisplayCard  value={booking} />)
          : <Text className='ml-8'>You have no upcoming bookings</Text>
        }
        <Text className="font-bold text-xl ml-8 my-8">Pending Bookings</Text>
        <DisplayCardList editable Card={BookingDisplayCard} value={pendingBookings} onDelete={handleDeclinePending} onEdit={handleAcceptPending}/>

      </View>
    </ScrollView>
  )
}