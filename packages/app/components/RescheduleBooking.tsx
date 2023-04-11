import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import {
  Box,
  Select,
  FormControl,
  Text,
  Button,
  CheckIcon,
  VStack
} from 'native-base'
import { Service, ScheduledTime, TimeOfDay, Day, BookingFrequency } from '@prisma/client'

import { useRouter, useSearchParams } from 'expo-router'
import { api } from 'app/utils/trpc'
import { useUser } from '@clerk/clerk-expo'
import { useAtom } from 'jotai'
import { sessionAtom } from 'app/utils/storage'

export default function RescheduleBooking() {
    const router = useRouter()
    const { bookingId, ownerId } = useSearchParams()
    const [scheduledTime, setScheduledTime] = React.useState('')
    const [scheduledDay, setScheduledDay] = React.useState('')
    const [scheduledFrequency, setScheduledFrequency] = React.useState('')
    const [session, _] = useAtom(sessionAtom)
    const {data: booking} = api.booking.byId.useQuery(Number(bookingId))
    const serviceId = booking.serviceId
    const scheduledTimeId = booking.scheduledTimeId
    const {data: serviceData} = api.service.byId.useQuery(serviceId)
    const {data: scheduleTime} = api.scheduledTime.byId.useQuery(Number(scheduledTimeId))
    const mutation = api.scheduledTime.update.useMutation()
    const {data: petData} = api.pet.byBookingId.useQuery(Number(bookingId))

    const handleSubmit = () => {
      mutation.mutate({
        id: scheduledTimeId,
        time: scheduledTime,
        day: scheduledDay,
        frequency: scheduledFrequency    
      })
      
    }

    return (
      <View className="flex flex-col justify-center items-center">
        <VStack space={4} className="mt-8 mx-8">
          <Text>Current Booking details:</Text>
          <Text>Here is your pet name: {petData? petData.map((pet) => pet.name).join(", ") : null}</Text>
          <Text>Here is your booking details: {serviceData?.type}</Text>
          <Text>Here is current frequency:  {scheduleTime?.frequency}</Text>
          <FormControl>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>Reschedule booking day </Text>
              <FormControl.Label>Day:</FormControl.Label>
              <Select 
                  selectedValue={scheduledDay}
                  onValueChange={(itemValue) => setScheduledDay(itemValue)}
              >
                  <Select.Item label="Monday" value="MONDAY" />
                  <Select.Item label="Tuesday" value="TEUSDAY" />
                  <Select.Item label="Wednesday" value="WEDNESDAY" />
                  <Select.Item label="Thursday" value="THURSDAY" />
                  <Select.Item label="Friday" value="FRIDAY" />
                  <Select.Item label="Saturday" value="SATURDAY" />
                  <Select.Item label="Sunday" value="SUNDAY" />
              </Select>
              <Text fontSize="2xl" fontWeight="bold" mb={4}>Reschedule booking time </Text>
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
              <Text fontSize="2xl" fontWeight="bold" mb={4}>Reschedule booking frequency </Text>
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
              <Button onPress={() => handleSubmit()}>
                  <Text>Reschedule Booking</Text>
              </Button>
          </FormControl>
        </VStack>
      </View>
    )
  }