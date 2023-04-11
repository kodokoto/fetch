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
        frequency: scheduledTime
        
            
      })
      
    }

    return (
      <View className="flex flex-col justify-center items-center">
        <Text>Current Booking details:</Text>
        <Text>Here is your pet name: {petData? petData.map((pet) => pet.name).join(", ") : null}</Text>
        <Text>Here is your booking details: {serviceData?.type}</Text>
        <Text>Here is current frequency:  {scheduleTime?.frequency}</Text>
        <FormControl>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>Reschedule booking frequency </Text>
            <FormControl.Label>Frequency:</FormControl.Label>
            <Select 
                selectedValue={scheduledTime}
                onValueChange={(itemValue) => setScheduledTime(itemValue)}
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
      </View>
    )
  }