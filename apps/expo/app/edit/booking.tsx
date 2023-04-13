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


export default function EditBooking() {
    const router = useRouter()

    const { bookingId, sitterId, ownerId, scheduledTimeId, day, timeOfDay } = useSearchParams()


    const { data: bookingData, isLoading: bookingDataIsLoading} = api.booking.byId.useQuery(Number(bookingId), )

    const { data: pets, isLoading: petsIsLoading} = api.pet.byOwnerId.useQuery(String(ownerId))
    
    const { data: availableServices, isLoading : availabileServicesIsLoading } = api.service.bySitterIdAndAvailableTime.useQuery({
        sitterId: String(sitterId),
        day: String(day) as Day,
        time: String(timeOfDay) as TimeOfDay
    })

    const mutation = api.booking.update.useMutation()

    const getPetByName = (name: string) => {
        return pets.find((pet) => pet.name === name)
    }

    function getServiceByType(name: string): Service {
        return availableServices.find((service) => service.type === name)
    }


    const handleSubmit = () => {
      mutation.mutateAsync({
        id: Number(bookingId),

        serviceId: getServiceByType(selectedServiceType).id,
        petId: getPetByName(selectedPet).id,
      }).then(() => {
        router.replace({
            pathname: `/booking/${bookingId}`,
            params: {
                bookingId: bookingId,
            }
        })
      })
    }
    function titleCase(string){
        return string[0].toUpperCase() + string.slice(1).toLowerCase();
    }
      
    const [selectedServiceType, setSelectedServiceType] = React.useState<string>(String(bookingData.serviceId));
    const [selectedPet, setSelectedPet] = React.useState("")
    if(availabileServicesIsLoading || petsIsLoading || bookingDataIsLoading) return null;

    return (
      <View className="flex flex-col justify-center items-center">
        <FormControl>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>Manage your booking</Text>
            <FormControl.Label>Service:</FormControl.Label>
            <Select 
                selectedValue={selectedServiceType}
                onValueChange={(itemValue) => setSelectedServiceType(itemValue)}
            >
                {
                    availableServices && availableServices.map((service) => {
                        return (
                            <Select.Item key={service.id} label={titleCase(service.type)} value={service.type} />
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
                    pets && pets.length > 0
                    ? pets.map((pet) => {
                        return (
                            <Select.Item key={pet.id} label={pet.name} value={pet.name} />
                        )
                    })
                    : <Select.Item 
                        label="No Pets" 
                        value="No Pets" 
                        onPress={() => router.push('/create/pet')
                    }/>
                }
            </Select>
            <Button onPress={handleSubmit}>
                <Text>Edit details</Text>
            </Button>
        </FormControl>
      </View>
    )
  }