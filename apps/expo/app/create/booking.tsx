import { View } from 'react-native'
import { useSearchParams, useRouter } from 'expo-router'
import { api } from 'app/utils/trpc'
import { useUser } from '@clerk/clerk-expo'
import React from 'react'
import {  Select, FormControl, Text, Button, CheckIcon, VStack } from 'native-base'
import { Service, ScheduledTime, TimeOfDay, Day, BookingFrequency } from '@prisma/client'

export default function AddBooking() {
  const router = useRouter()

  const { sitterId, serviceType, day, timeOfDay, petTypes } = useSearchParams()


  const { isLoaded, user } = useUser()
  const userId = user?.id

  const { data: ownerData } = api.owner.byUserId.useQuery(userId, { enabled: !!userId })
  const ownerId = ownerData?.id


  const { data: sitterData, isLoading: sitterDataIsLoading } = api.sitter.byId.useQuery(String(sitterId))

  const [filteredPets, setFilteredPets] = React.useState([])

  const { data: pets, isLoading: petsIsLoading } = api.pet.byOwnerId.useQuery(ownerId, {
    enabled: !!ownerId,
    cacheTime: 0,
    onSuccess: (data) => {
      setFilteredPets(data.filter((pet) => petType.includes(pet.type)))
    },
  })

  const { data: availableServices, isLoading: availabileServicesIsLoading } =
    api.service.bySitterIdAndAvailableTime.useQuery({
      sitterId: String(sitterId),
      day: String(day) as Day,
      time: String(timeOfDay) as TimeOfDay,
    })
  const mutation = api.booking.create.useMutation()

  const getPetByName = (name: string) => {
    return pets.find((pet) => pet.name === name)
  }

  function getServiceByType(name: string): Service {
    return availableServices.find((service) => service.type === name)
  }

  const petType: string[] = String(petTypes).split(',')

  const handleSubmit = () => {
    mutation.mutate({
      scheduledTime: scheduledTime,
      sitterId: String(sitterId),
      ownerId: ownerData.id,
      serviceId: getServiceByType(selectedServiceType).id,
      petId: getPetByName(selectedPet).id,
    })
    router.push('/home')
  }
  function titleCase(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase()
  }

  const [selectedServiceType, setSelectedServiceType] = React.useState<string>(String(serviceType))
  const [selectedPet, setSelectedPet] = React.useState('')
  const [scheduledTime, setScheduledTime] = React.useState<Partial<ScheduledTime>>({
    day: String(day) as Day,
    time: String(timeOfDay) as TimeOfDay,
    frequency: 'ONE_OFF' as BookingFrequency,
  })
  if (!isLoaded || availabileServicesIsLoading || sitterDataIsLoading || petsIsLoading) return null

  return (
    <View className="flex flex-col justify-center items-center m-8">
      <FormControl>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Send a booking request to {sitterData.name}
        </Text>
        <View className="my-4">
          <FormControl.Label>Service:</FormControl.Label>
          <Select selectedValue={selectedServiceType} onValueChange={(itemValue) => setSelectedServiceType(itemValue)}>
            {availableServices &&
              availableServices.map((service) => {
                return <Select.Item key={service.id} label={titleCase(service.type)} value={service.type} />
              })}
          </Select>
        </View>
        <View className="my-4">
          <FormControl.Label>Pet:</FormControl.Label>
          <Select
            selectedValue={selectedPet}
            onValueChange={(itemValue) => setSelectedPet(itemValue)}
            placeholder="Select a Pet"
          >
            {filteredPets && filteredPets.length > 0 ? (
              filteredPets.map((pet) => {
                return <Select.Item key={pet.id} label={pet.name} value={pet.name} />
              })
            ) : (
              <Select.Item label="No Pets" value="No Pets" onPress={() => router.push('/create/pet')} />
            )}
          </Select>
        </View>
        <View className="my-4">
          <FormControl.Label>Frequency:</FormControl.Label>
          <Select
            selectedValue={scheduledTime.frequency}
            onValueChange={(itemValue) =>
              setScheduledTime({ ...scheduledTime, frequency: itemValue as BookingFrequency })
            }
          >
            <Select.Item label="One Off" value="ONE_OFF" />
            <Select.Item label="Every week" value="WEEKLY" />
            <Select.Item label="Every two weeks" value="BI_WEEKLY" />
            <Select.Item label="Every month" value="MONTHLY" />
          </Select>
        </View>
        <Button className="w-11/12 mx-auto my-8 bg-blue-500 rounded-full" onPress={handleSubmit}>
          <Text className="text-white">Send Booking Request</Text>
        </Button>
      </FormControl>
    </View>
  )
}
