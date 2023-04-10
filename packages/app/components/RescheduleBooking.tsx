import { View, TouchableOpacity } from 'react-native'
import { useSearchParams, useRouter } from 'expo-router'
import { api } from 'app/utils/trpc'
import { StatusBar } from 'expo-status-bar'
import { useUser } from '@clerk/clerk-expo'
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


export default function AddBooking() {

    const [selectedServiceType, setSelectedServiceType] = React.useState('')
    const [selectedPet, setSelectedPet] = React.useState("")
    const [scheduledTime, setScheduledTime] = React.useState('')
    
  
    return (
      <View className="flex flex-col justify-center items-center">
        <FormControl>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>Send a booking request to </Text>
            <FormControl.Label>Service:</FormControl.Label>
            <Select 
                selectedValue={selectedServiceType}
                onValueChange={(itemValue) => setSelectedServiceType(itemValue)}
            >
            </Select>
            <FormControl.Label>Pet:</FormControl.Label>
            <Select 
                selectedValue={selectedPet}
                onValueChange={(itemValue) => setSelectedPet(itemValue)}
                placeholder='Select a Pet'
            >
            </Select>
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
            <Button>
                <Text>Send Booking Request</Text>
            </Button>
        </FormControl>
      </View>
    )
  }