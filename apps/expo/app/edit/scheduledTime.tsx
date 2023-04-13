import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import {
  Box,
  Select,
  FormControl,
  Text,
  Button,
  CheckIcon,
  Center,
  VStack
} from 'native-base'
import { Service, ScheduledTime, TimeOfDay, Day, BookingFrequency } from '@prisma/client'
import { Booking } from '@prisma/client'
import { useRouter, useSearchParams } from 'expo-router'
import { api } from 'app/utils/trpc'
import { useUser } from '@clerk/clerk-expo'
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
    const ownerId = session.ownerId
    
    console.log("ownerId: ", session.ownerId)
    const { bookingId } = useSearchParams()
    console.log("BookingId: ", bookingId)

    const { data: booking, isLoading: bookingDataIsLoading } = api.booking.byId.useQuery(Number(bookingId))

    //GET TIMES
    const scheduledTimeId = booking.scheduledTimeId
    const mutation = api.scheduledTime.update.useMutation()
    const {data: schdeuledTimes, isLoading: shceduledTimesIsLoading } = api.scheduledTime.byId.useQuery(scheduledTimeId,
    {
        onSuccess: (data) => {
            setScheduledTime(data.time)
            setScheduledDay(data.day)
            setScheduledFrequency(data.frequency)
        }
    })
    
    const handleSubmit = () => {
      mutation.mutate({
        id: scheduledTimeId,
        time: scheduledTime,
        day: scheduledDay,
        frequency: scheduledFrequency    
      })
      router.push({
        pathname: '/home'
      })
      
    }
    
    if (shceduledTimesIsLoading || bookingDataIsLoading) {
        return <Text>Loading...</Text>
    }

    return (
      <View className="flex flex-col justify-center items-center mt-20">
        <VStack space={4} className="mt-8 mx-8">
          <FormControl>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>Reschedule booking: </Text>
              <FormControl.Label>Day:</FormControl.Label>
              <Select 
                  selectedValue={scheduledDay}
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
              <FormControl.Label>Time:</FormControl.Label>
              <Select 
                  selectedValue={scheduledTime}
                  onValueChange={(itemValue) => setScheduledTime(itemValue)}
              >
                  <Select.Item label="Any" value="ANY" />
                  <Select.Item label="6am-11am" value="MORNING" />
                  <Select.Item label="11am-3pm" value="AFTERNOON" />
                  <Select.Item label="3pm-10pm" value="EVENING" />
              </Select>
              <FormControl.Label>Frequency:</FormControl.Label>
              <Select 
                  selectedValue={scheduledFrequency}
                  onValueChange={(itemValue) => setScheduledFrequency(itemValue)}
              >
                  <Select.Item label="One Off" value="ONE_OFF" />
                  <Select.Item label="Every week" value="WEEKLY" />
                  <Select.Item label="Every two weeks" value="BI_WEEKLY" />
                  <Select.Item label="Every month" value="MONTHLY" />
              </Select>
              <Button 
              className="w-[300px] m-auto mt-10"
              onPress={() => handleSubmit()}>
                  <Text>Reschedule</Text>
              </Button>
          </FormControl>
        </VStack>
      </View>
    )
  }