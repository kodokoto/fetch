import { View } from 'react-native'
import { useSearchParams, useRouter, Stack } from 'expo-router'
import { api } from 'app/utils/trpc'
import React from 'react'
import { Select, FormControl, Text, Button } from 'native-base'
import { Service, TimeOfDay, Day } from '@prisma/client'

export default function EditBooking() {
  const router = useRouter()

  const { bookingId, sitterId, ownerId, day, timeOfDay } = useSearchParams()

  const { data: bookingData, isLoading: bookingDataIsLoading } = api.booking.byId.useQuery(Number(bookingId))

  const { data: pets, isLoading: petsIsLoading } = api.pet.byOwnerId.useQuery(String(ownerId), {
    onSuccess: (data) => {
      setSelectedPet(data.find((pet) => pet.id === bookingData.petId).name)
    },
  })

  const { data: availableServices, isLoading: availabileServicesIsLoading } =
    api.service.bySitterIdAndAvailableTime.useQuery(
      {
        sitterId: String(sitterId),
        day: String(day) as Day,
        time: String(timeOfDay) as TimeOfDay,
      },
      {
        onSuccess: (data) => {
          setSelectedServiceType(data.find((service) => service.id === bookingData.serviceId).type)
        },
      }
    )

  const mutation = api.booking.update.useMutation()

  const getPetByName = (name: string) => {
    return pets.find((pet) => pet.name === name)
  }

  function getServiceByType(name: string): Service {
    return availableServices.find((service) => service.type === name)
  }

  const handleSubmit = () => {
    mutation
      .mutateAsync({
        id: Number(bookingId),

        serviceId: getServiceByType(selectedServiceType).id,
        petId: getPetByName(selectedPet).id,
      })
      .then(() => {
        router.replace({
          pathname: `/booking/${bookingId}`,
          params: {
            bookingId: bookingId,
          },
        })
      })
  }
  function titleCase(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase()
  }

  const [selectedServiceType, setSelectedServiceType] = React.useState<string>(String(bookingData.serviceId))
  const [selectedPet, setSelectedPet] = React.useState('')

  if (availabileServicesIsLoading || petsIsLoading || bookingDataIsLoading) return null

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Edit Booking',
        }}
      />
      <View className="flex flex-col justify-center items-center m-8">
        <FormControl>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Manage your booking
          </Text>
          <FormControl.Label>Service:</FormControl.Label>
          <Select
            rounded={'full'}
            selectedValue={selectedServiceType}
            onValueChange={(itemValue) => setSelectedServiceType(itemValue)}
          >
            {availableServices &&
              availableServices.map((service) => {
                return <Select.Item key={service.id} label={titleCase(service.type)} value={service.type} />
              })}
          </Select>
          <FormControl.Label>Pet:</FormControl.Label>
          <Select
            rounded={'full'}
            selectedValue={selectedPet}
            onValueChange={(itemValue) => setSelectedPet(itemValue)}
            placeholder="Select a Pet"
          >
            {pets && pets.length > 0 ? (
              pets.map((pet) => {
                return <Select.Item key={pet.id} label={pet.name} value={pet.name} />
              })
            ) : (
              <Select.Item label="No Pets" value="No Pets" onPress={() => router.push('/create/pet')} />
            )}
          </Select>
          <Button onPress={handleSubmit} className="bg-blue-500 rounded-full w-11/12 mx-auto mt-8">
            <Text className="text-white font-bold">Edit details</Text>
          </Button>
        </FormControl>
      </View>
    </>
  )
}
