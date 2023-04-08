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
  CheckIcon,
  VStack
} from 'native-base'


export default function AddBooking() {
    const { sitterId, date, availability, dateTime  } = useSearchParams()

    // const searchParamsObject = {
    //   dateTime: String(dateTime),
    //   availability: String(availability),
    //   date: String(date),
    // }
    // convert to number
    const { isLoaded, user } = useUser()
    const { data: sitterData, error, isLoading } = api.sitter.byId.useQuery(Number(sitterId))
    const { data: ownerData, error: ownerError, isLoading: isloadingOwner} = api.owner.byId.useQuery(Number(user.id))
    const { data: pets, error: petError, isLoading: isloadingPet} = api.pet.byOwnerId.useQuery(Number(ownerData.id))
    const {data: services, error: serviceError, isLoading: isLoadingService} = api.service.bySitterIdArray.useQuery(Number(sitterId))
    const navigation = useNavigation()

    const mutation = api.booking.create.useMutation()


    const handleSubmit = () => {
      mutation.mutate({
        startDate: bookingDateTime,
        sitterId: Number(sitterId),
        ownerId: ownerData.id,
        services: service,
        frequency: frequency,
        pets: selectedPets
      })
      setService(null),
      setfrequency(''),
      setSelectedPet([]);
    }
    
 
    const [time, setTime] = React.useState('');
    
    const [bookingDateTime, setDate] = React.useState(new Date())
    const [service, setService] = React.useState(null)
    const [selectedPets, setSelectedPet] = React.useState([])
    const [petId, setPetId] = React.useState(new Number)
    const [frequency, setfrequency] = React.useState('')

    if(availability === 'MORNING'){
      setTime('6');
    } else if(availability === 'AFTERNOON'){
      setTime('11')
    } else if(availability === 'EVENING'){
      setTime('15')
    }
    const dateTimeString = `${dateTime}T${time}:00:00`;
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
          <Text>{sitterData.name}</Text>
        </Box>
        <Text >Date: {date}</Text>
        <Text>Time: {availability}</Text>
        {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
        <StatusBar style="light" />
        <Box>
          {/* Display date (not time)*/}
          <FormControl isRequired>
            <VStack>
              <FormControl.Label _text={{ bold: true }}>Service:</FormControl.Label>
              <Box maxW="full">
                <Select
                  selectedValue={String(service)}
                  minWidth="full"
                  accessibilityLabel="Choose Service"
                  placeholder="Choose Service"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setService(Number(itemValue))}
                >
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
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
                  <Select.Item label="one-off" value="ONE_OFF" />
                  <Select.Item label="every week" value="WEEKLY" />
                  <Select.Item label="every two week" value="BI_WEEKLY" />
                  <Select.Item label="every month" value="MONTHLY" />
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