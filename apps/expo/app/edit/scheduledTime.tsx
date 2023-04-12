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
    const [selectedServiceType, setSelectedServiceType] = React.useState('')
    const [selectedPet, setSelectedPet] = React.useState('')
    const [scheduledTime, setScheduledTime] = React.useState('')
    const [scheduledDay, setScheduledDay] = React.useState('')
    const [scheduledFrequency, setScheduledFrequency] = React.useState('')

    const [session] = useAtom(sessionAtom)
    
    console.log("ownerId: ", session.ownerId)
    const { bookingId, sitterId, ownerId } = useSearchParams()
    console.log("BookingId: ", bookingId)

    const { data: sitterData, isLoading: sitterDataIsLoading} = api.sitter.byId.useQuery(String(sitterId))

    const { data: pets, isLoading: petsIsLoading} = api.pet.byOwnerId.useQuery(String(ownerId), { enabled: !!ownerId, cacheTime: 0 })
    

    const { data: booking } = api.booking.byId.useQuery(Number(bookingId))
    const mutationBooking = api.booking.update.useMutation()

    //GET TIMES
    const scheduledTimeId = booking.scheduledTimeId
    const mutationSchedule = api.scheduledTime.update.useMutation()
    const {data: schdeuledTimes } = api.scheduledTime.byId.useQuery(scheduledTimeId)
    
    //Get PetData
    const {data: petData } = api.pet.byBookingId.useQuery(Number(bookingId))
    const {data: serviceType } = api.service.byBookingId.useQuery(Number(bookingId))
    const { data: availableServices, isLoading : availabileServicesIsLoading } = api.service.bySitterIdAndAvailableTime.useQuery({
        sitterId: String(sitterId),
        day: String(day) as Day,
        time: String(timeOfDay) as TimeOfDay
    })
    const getPetByName = (name: string) => {
        return pets.find((pet) => pet.name === name)
    }

    function getServiceByType(name: string): Service {
        return availabileServices.find((service) => service.type === name)
    }

    const handleSubmit = () => {
        mutationBooking.mutateAsync({
            id: bookingId,
            ownerId: ownerId,
            petId: getPetByName(selectedPet).id,
            serviceId: getServiceByType(selectedServiceType).id,
        })
      mutationSchedule.mutateAsync({
        id: scheduledTimeId,
        time: scheduledTime,
        day: scheduledDay,
        frequency: scheduledFrequency    
      })
      
    }

    return (
      <View className="flex flex-col justify-center items-center mt-20">
        <VStack space={4} className="mt-8 mx-8">
          <Box className ="rounded-2xl border-[#4c8ab9] border-solid  border-2 bg-slate-100">
            <Center>
              <Text fontWeight="bold" mb={1}>Current Booking details:</Text>
              <Text>Pet name: {petData? petData.map((pet) => pet.name).join(", ") : null}</Text>
              <Text>Service type: {serviceType?.type}</Text>
              <Text fontWeight="bold" >Current booking schedule: </Text>
              <Text>Day: {schdeuledTimes?.day}</Text>
              <Text>Time: {schdeuledTimes?.time}</Text>
              <Text>Frequency: {schdeuledTimes?.frequency}</Text>
            </Center>
          </Box>
          <FormControl>
              <Text fontSize="2xl" fontWeight="bold" mb={4}>Edit booking details: </Text>
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
              <Text fontSize="2xl" fontWeight="bold" mb={4}>Reschedule booking: </Text>
              <FormControl.Label>Day:</FormControl.Label>
              <Select 
                selectedValue={scheduledDay}
                defaultValue={schdeuledTimes?.day}
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
                defaultValue={schdeuledTimes?.time}
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
                  defaultValue={schdeuledTimes?.frequency}
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