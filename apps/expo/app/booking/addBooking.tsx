import { View, TouchableOpacity } from 'react-native'
import { useSearchParams, useNavigation, Link } from 'expo-router'
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
  Input,
  CheckIcon,
  VStack
} from 'native-base'
import { useRouter } from 'expo-router'


export default function AddBooking() {
    const { sitterId, date, time  } = useSearchParams()
    // convert to number
    const { isLoaded, user } = useUser()
    const { data: sitterData, error, isLoading } = api.sitter.byId.useQuery(Number(sitterId))
    const {data: availableData, error: availableError, isLoading: isLoadingAvailability} = api.availableTime.bySitterId.useQuery(Number(sitterId))
    const { data: sitterUserData, error: sitterError, isLoading: isloadingSitter} = api.user.bySitterId.useQuery(sitterData?.userId)
    const { data: ownerData, error: ownerError, isLoading: isloadingOwner} = api.owner.byId.useQuery(Number(user.id))
    const { data: pets, error: petError, isLoading: isloadingPet} = api.pet.byOwnerId.useQuery(Number(ownerData.id))
    const {data: services, error: serviceError, isLoading: isLoadingService} = api.service.bySitterIdArray.useQuery(Number(sitterId))
    // const { data: ownerData, error: ownerError, isLoading: isloadingOwner} = api.owner.byId.useQuery(user.)
    const navigation = useNavigation()

    const mutation = api.booking.create.useMutation()


    const handleSubmit = () => {
      // const pet = selectedPets.map((id) => ({id}))
      mutation.mutate({
        startDate: dateTime,
        sitterId: Number(sitterId),
        ownerId: ownerData.id,
        services: service,
        frequency: frequency,
        pets: selectedPets
      })
      setService(''),
      setfrequency(''),
      setSelectedPet([]);
    }

    const dateTimeString = `${date}T${time}:00`;
    const [dateTime, setDate] = React.useState(new Date())
    const [service, setService] = React.useState('')
    const [selectedPets, setSelectedPet] = React.useState([])
    const [petId, setPetId] = React.useState(new Number)
    const [frequency, setfrequency] = React.useState('')
    setDate(new Date(dateTimeString))
    // If the page was reloaded or navigated to directly, then the modal should be presented as
    // a full screen page. You may need to change the UI to account for this.
    const isPresented = navigation.canGoBack()
    if (isLoadingService) return <Text>Loading...</Text>
    if (serviceError) return <Text>{error.message}</Text>
  
    return (
      <View className="flex flex-col justify-center items-center">
        {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
        {!isPresented && <Link href="../">Dismiss</Link>}
        <Box>
          <Text>Sitter Name</Text>
          <Text>{sitterUserData.name}</Text>
        </Box>
        <Text >Date: {date}</Text>
        <Text>Time: {time}</Text>
        {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
        <StatusBar style="light" />
        <Box>
          {/* Display date (not time)*/}
          <FormControl isRequired>
            <VStack>
              <FormControl.Label _text={{ bold: true }}>Service:</FormControl.Label>
              <Box maxW="full">
                <Select
                  selectedValue={service}
                  minWidth="full"
                  accessibilityLabel="Choose Service"
                  placeholder="Choose Service"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setService(itemValue)}
                >
                  {services.map((service) => (
                    <option key={service.id} value={service.type}>
                      {service.type}({service.petType}) - ${service.price} 
                    </option>
                  ))}
                </Select>
              </Box>
              <FormControl.Label _text={{ bold:true }}>Pet</FormControl.Label>
              <Box maxW='full'>
              <Select
                  selectedValue={String(petId)}
                  minWidth="full"
                  accessibilityLabel="Choose Pet"
                  placeholder="Choose Pet"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => {
                    const index = selectedPets.indexOf(Number(itemValue))
                    if (index === -1) {
                      // add the pet ID to the array if it's not already there
                      setSelectedPet([...selectedPets, Number(itemValue)])
                    } else {
                      // remove the pet ID from the array if it's already there
                      const newSelectedPets = [...selectedPets]
                      newSelectedPets.splice(index, 1)
                      setSelectedPet(newSelectedPets)
                    }
                    setPetId(Number(itemValue))
                  }}
                >
                  {pets.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                      {pet.name}
                    </option>
                  ))}
                </Select>
              </Box>
              <FormControl.Label _text={{ bold: true }}>Open for frequency visit:</FormControl.Label>
              <Box maxW="full">
                <Select
                  selectedValue={frequency}
                  minWidth="full"
                  accessibilityLabel="Choose availability"
                  placeholder="Choose availability"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setfrequency(itemValue)}
                >
                  {availableData.map((frequency) => (
                    <option key={frequency.frequency} value={frequency.frequency}>
                      {frequency.frequency}
                    </option>
                  ))}
                </Select>
              </Box>
            </VStack>
            <Box className="flex-wrap flex-row mt-2 mb-10">
                <Button className="ml-auto rounded-2xl" onPress={handleSubmit}>Book</Button>
                <Button className="mr-auto ml-2 rounded-2xl">Cancel</Button>
            </Box>
          </FormControl>
        </Box>
      </View>
    )
  }