import { Text, View } from 'react-native'
import { Button } from 'native-base'
import { useSearchParams, useNavigation, Link } from 'expo-router'
import { api } from 'app/utils/trpc'
import { StatusBar } from 'expo-status-bar'
import BookingDetail from 'app/components/BookingDetail'
import { useRouter, Stack } from 'expo-router'
import SitterBookingDetail from 'app/components/SitterBookingDetail'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'

export default function Booking() {
  const { bookingId } = useSearchParams()
  const router = useRouter()
  const [session, _] = useAtom(sessionAtom)

  console.log("Booking Id: " + bookingId);
  
  // convert to number
  const { data, error, isLoading } = api.booking.byId.useQuery(Number(bookingId))

  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>
  if (session.currentProfile === Profile.OWNER) {

    return (
      <>
        <Stack.Screen options={{
          headerTitle: 'Booking Details',
        }} />
        <BookingDetail {...data} />
      </>
    )
  } 
  if (session.currentProfile === Profile.SITTER) {
    return (
      <>
        <Stack.Screen options={{
          headerTitle: 'Booking Details',
        }} />
      <SitterBookingDetail {...data}/>
      </>
    )
  }
  
}
