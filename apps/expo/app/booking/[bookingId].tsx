import { Text } from 'react-native'
import { useSearchParams } from 'expo-router'
import { api } from 'app/utils/trpc'
import BookingDetail from 'app/components/BookingDetail'
import { Stack } from 'expo-router'

export default function Booking() {
  const { bookingId } = useSearchParams()

  const { data, error, isLoading } = api.booking.byId.useQuery(Number(bookingId))

  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Booking Details',
        }}
      />
      <BookingDetail {...data} />
    </>
  )
}
