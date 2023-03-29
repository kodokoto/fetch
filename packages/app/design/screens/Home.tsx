import { View, Text } from 'react-native'
import { trpc } from "../../utils/trpc";

export default function Home() {
  const { data, error } = trpc.booking.all.useQuery();
  console.log(data)
  if (error) {
    return <Text>{error.message}</Text>
  }

  return (
    <View>
      {data?.map((booking) => (
        <View>
          <Text key={booking.id}>{booking.ownerId}</Text>
          <Text key={booking.id}>{booking.id}</Text>
        </View>
      ))}
      <Text className="text-red-500">Test</Text>
    </View>
  )
}