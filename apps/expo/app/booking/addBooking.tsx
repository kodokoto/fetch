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
    const { sitterId, service, date, availability, dateTime  } = useSearchParams()

    const [time, setTime] = React.useState('');
    
    const [bookingDateTime, setDate] = React.useState(new Date())
    const [selectedPets, setSelectedPet] = React.useState('')
    const [frequency, setfrequency] = React.useState('')
    const { isLoaded, user } = useUser()
    const { data: sitterData, error, isLoading } = api.sitter.byId.useQuery(Number(sitterId))
    const { data: ownerData} = api.owner.byId.useQuery(Number(user.id))
    const { data: pets} = api.pet.byOwnerId.useQuery(Number(ownerData.id))
    const {data : pet} = api.pet.byId.useQuery(Number(selectedPets))
    const {data: services} = api.service.byService.useQuery(String(service))
    const navigation = useNavigation()

    const mutation = api.booking.create.useMutation()


    const handleSubmit = () => {
      mutation.mutate({
        startDate: bookingDateTime,
        sitterId: Number(sitterId),
        ownerId: ownerData.id,
        services: services.id,
        frequency: frequency,
        pets: pet.id
      })
      setfrequency(''),
      setSelectedPet('');
    }

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
    if (isLoading) return <Text>Loading...</Text>
    if (error) return <Text>{error.message}</Text>
  
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
        <Text>Service: {service}</Text>
        <Text>Price: {services.price}</Text>
        {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
        <StatusBar style="light" />
        <Box>
          {/* Display date (not time)*/}
          <FormControl isRequired>
            <VStack>
              <FormControl.Label _text={{ bold:true }}>Pet</FormControl.Label>
              <Box maxW='full'>
              <Select
                  selectedValue={selectedPets}
                  minWidth="full"
                  accessibilityLabel="Choose Pet"
                  placeholder="Choose Pet"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => {setSelectedPet(itemValue)}}
                >
                  {pets? pets.map((pet) => (
                    <Select.Item label={pet.name} value={String(pet.id)}/>
                  )) : null}
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