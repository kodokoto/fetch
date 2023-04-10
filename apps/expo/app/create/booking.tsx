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
} from 'native-base'
import { Service, ScheduledTime, TimeOfDay, Day, BookingFrequency } from '@prisma/client'


export default function AddBooking() {
    const router = useRouter()

    const { sitterId, serviceType, day, dayTime } = useSearchParams()

    const { isLoaded, user } = useUser()
    const userId = user?.id

    const { data: ownerData} = api.owner.byUserId.useQuery(userId, { enabled: !!userId })
    const ownerId = ownerData?.id
    
    const { data: sitterData, isLoading: sitterDataIsLoading} = api.sitter.byId.useQuery(Number(sitterId))

    const { data: pets, isLoading: petsIsLoading} = api.pet.byOwnerId.useQuery(ownerId, { enabled: !!ownerId, cacheTime: 0 })
    const { data: availabileServices, isLoading : availabileServicesIsLoading } = api.service.bySitterIdAndAvailableTime.useQuery({
        sitterId: Number(sitterId),
        day: String(day) as Day,
        time: String(dayTime) as TimeOfDay
    })
    const mutation = api.booking.create.useMutation()

    const getPetByName = (name: string) => {
        return pets.find((pet) => pet.name === name)
    }

    function getServiceByType(name: string): Service {
        return availabileServices.find((service) => service.type === name)
    }

    const handleSubmit = () => {
      mutation.mutate({
        scheduledTime: scheduledTime,
        sitterId: Number(sitterId),
        ownerId: ownerData.id,
        serviceId: getServiceByType(selectedServiceType).id,
        petId: getPetByName(selectedPet).id
      })
    }

    const [selectedServiceType, setSelectedServiceType] = React.useState<string>(String(serviceType));
    const [selectedPet, setSelectedPet] = React.useState("")
    const [scheduledTime, setScheduledTime] = React.useState<Partial<ScheduledTime>>({
        day: String(day) as Day,
        time: String(dayTime) as TimeOfDay,
        frequency: "ONE_OFF" as BookingFrequency
    })
    if(!isLoaded || availabileServicesIsLoading || sitterDataIsLoading || petsIsLoading) return null;
  
    return (
      <View className="flex flex-col justify-center items-center">
        <FormControl>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>Send a booking request to {sitterData.name}</Text>
            <FormControl.Label>Service:</FormControl.Label>
            <Select 
                selectedValue={selectedServiceType}
                onValueChange={(itemValue) => setSelectedServiceType(itemValue)}
            >
                {
                    availabileServices.map((service) => {
                        return (
                            <Select.Item key={service.id} label={service.type} value={service.type}>£{service.price}</Select.Item>
                        )
                    })
                }
            </Select>
            <FormControl.Label>Pet:</FormControl.Label>
            <Select 
                selectedValue={selectedPet}
                onValueChange={(itemValue) => setSelectedPet(itemValue)}
                placeholder='Select a Pet'
            >
                {
                    pets 
                    ? pets.map((pet) => {
                        return (
                            <Select.Item key={pet.id} label={pet.name} value={pet.name} />
                        )
                    })
                    : <Select.Item label="No Pets" value="No Pets" onPress={
                        () => router.push('/pet/create')
                    }/>
                }
            </Select>
            <FormControl.Label>Frequency:</FormControl.Label>
            <Select 
                selectedValue={scheduledTime.frequency}
                onValueChange={(itemValue) => setScheduledTime({...scheduledTime, frequency: itemValue as BookingFrequency})}
            >
                <Select.Item label="One Off" value="ONE_OFF" />
                <Select.Item label="Every week" value="WEEKLY" />
                <Select.Item label="Every two weeks" value="BI_WEEKLY" />
                <Select.Item label="Every month" value="MONTHLY" />
            </Select>
            <Button onPress={handleSubmit}>
                <Text>Send Booking Request</Text>
            </Button>
        </FormControl>
      </View>
    )
  }