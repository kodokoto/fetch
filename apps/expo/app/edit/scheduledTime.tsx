import { View } from 'react-native'
import React from 'react'
import { Select, FormControl, Text, Button, VStack } from 'native-base'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { api } from 'app/utils/trpc'
import { useAtom } from 'jotai'
import { sessionAtom } from 'app/utils/storage'

export default function RescheduleBooking() {
  const router = useRouter()

  //VARIABLES FOR FORM
  const [scheduledTime, setScheduledTime] = React.useState('')
  const [scheduledDay, setScheduledDay] = React.useState('')
  const [scheduledFrequency, setScheduledFrequency] = React.useState('')

  const [session] = useAtom(sessionAtom)
  //OWNERID

  const { bookingId } = useSearchParams()

  const { data: booking, isLoading: bookingDataIsLoading } = api.booking.byId.useQuery(Number(bookingId))

  //GET TIMES
  const scheduledTimeId = booking.scheduledTimeId
  const mutation = api.scheduledTime.update.useMutation()
  const { isLoading: shceduledTimesIsLoading } = api.scheduledTime.byId.useQuery(
    scheduledTimeId,
    {
      onSuccess: (data) => {
        setScheduledTime(data.time)
        setScheduledDay(data.day)
        setScheduledFrequency(data.frequency)
      },
    }
  )

  const handleSubmit = () => {
    mutation.mutate({
      id: scheduledTimeId,
      time: scheduledTime,
      day: scheduledDay,
      frequency: scheduledFrequency,
    })
    router.push({
      pathname: '/home',
    })
  }

  if (shceduledTimesIsLoading || bookingDataIsLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Reschedule Booking',
        }}
      />
      <View className="flex flex-col m-4 mt-20">
        <VStack className="mt-8 mx-8">
          <FormControl>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Reschedule booking:{' '}
            </Text>
            <FormControl.Label className="mt-4">Day:</FormControl.Label>
            <Select
              selectedValue={scheduledDay}
              rounded={'full'}
              onValueChange={(itemValue) => setScheduledDay(itemValue)}
            >
              <Select.Item label="Monday" value="MONDAY" />
              <Select.Item label="Tuesday" value="TUESDAY" />
              <Select.Item label="Wednesday" value="WEDNESDAY" />
              <Select.Item label="Thursday" value="THURSDAY" />
              <Select.Item label="Friday" value="FRIDAY" />
              <Select.Item label="Saturday" value="SATURDAY" />
              <Select.Item label="Sunday" value="SUNDAY" />
            </Select>
            <FormControl.Label className="mt-4">Time:</FormControl.Label>
            <Select
              rounded={'full'}
              selectedValue={scheduledTime}
              onValueChange={(itemValue) => setScheduledTime(itemValue)}
            >
              <Select.Item label="Any" value="ANY" />
              <Select.Item label="6am-11am" value="MORNING" />
              <Select.Item label="11am-3pm" value="AFTERNOON" />
              <Select.Item label="3pm-10pm" value="EVENING" />
            </Select>
            <FormControl.Label className="mt-4">Frequency:</FormControl.Label>
            <Select
              rounded={'full'}
              selectedValue={scheduledFrequency}
              onValueChange={(itemValue) => setScheduledFrequency(itemValue)}
            >
              <Select.Item label="One Off" value="ONE_OFF" />
              <Select.Item label="Every week" value="WEEKLY" />
              <Select.Item label="Every two weeks" value="BI_WEEKLY" />
              <Select.Item label="Every month" value="MONTHLY" />
            </Select>
          </FormControl>
          <Button
            className=" w-11/12 mx-auto bg-blue-500 rounded-full mt-10 items-center"
            onPress={() => handleSubmit()}
          >
            <Text className="text-white font-bold">Reschedule</Text>
          </Button>
        </VStack>
      </View>
    </>
  )
}
