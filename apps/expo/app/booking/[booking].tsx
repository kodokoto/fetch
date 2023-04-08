import { Text, View } from 'react-native'
import { useSearchParams, useNavigation, Link } from 'expo-router'
import { api } from 'app/utils/trpc'
import { StatusBar } from 'expo-status-bar'
import BookingDetail from 'app/components/BookingDetail'
import { sitterRouter } from 'api/src/router/sitter'
import { userRouter } from 'api/src/router/user'

export default function Booking() {
  const { bookingId } = useSearchParams()
  // convert to number
  const { data, error, isLoading } = api.booking.byId.useQuery(Number(bookingId))


  const navigation = useNavigation()
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = navigation.canGoBack()

  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>

  return (
    <View className="flex flex-col justify-center items-center">
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}
      {/* <BookingDeatil /> */}
      <Text>this is booking {bookingId}</Text>
      <BookingDetail{...data}/>
      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style="light" />
    </View>
  )
}
