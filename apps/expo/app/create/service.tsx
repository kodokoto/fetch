import { View } from 'react-native'
import {
    Box,
    Select,
    FormControl,
    Text,
    Button,
    CheckIcon,
    VStack,
    TextArea,
    Input
  } from 'native-base'
import React from 'react'
import { api } from 'app/utils/trpc';
import { useAtom } from 'jotai';
import { sessionAtom } from 'app/utils/storage';
import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function AddService() {
    const [serviceType, setServiceType] = React.useState('')
    const [petType, setPetType] = React.useState('')
    const [description, setDescription] = React.useState('');
    const [price, setPrice] = React.useState("0");
    const [duration, setDuration] = React.useState(0);
    const [day, setDay] = React.useState('');
    const [time, setTime] = React.useState('');


    const router = useRouter();

    const [session, setSession] = useAtom(sessionAtom)
    const mutation = api.service.create.useMutation()
    const sitterid = session.sitterId

    let handleSubmit = () => {
        console.log(123);
        console.log("Service Type: " + serviceType);
        console.log("Pet Type: " + petType);
        console.log("Description: " + description);
        console.log("Price: " + Number(price).toFixed(2));
        console.log("Duration: " + duration);

        mutation.mutate({
            sitterId: sitterid,
            serviceType: serviceType,
            price: Number(Number(price).toFixed(2)),
            description: description,
            duration: duration,
            petType: petType,
            availableTimes: [
                {
                    day: day,
                    time: time
                }
            ]
          })
      
          router.push(`/home`);
    }
  return (
    <KeyboardAwareScrollView>
        <Box>
      <FormControl isRequired>
        <VStack space={4} className="mt-8 mx-8">
          <FormControl.Label _text={{ bold: true }}>Service Type:</FormControl.Label>
          <Box maxW="full">
            <Select
              selectedValue={String(serviceType)}
              minWidth="full"
              accessibilityLabel="Choose report type"
              placeholder="Choose report type"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setServiceType(itemValue)}
            >
              <Select.Item label="Walk" value="WALK" />
              <Select.Item label="Pet Care" value="PET_CARE" />
              <Select.Item label="House Sitting" value="HOUSE_SITTING" />
            </Select>
          </Box>
          <FormControl.Label _text={{ bold: true }}>Price:</FormControl.Label>
          <Box>
          <Input keyboardType="numeric" value={price} onChangeText={priceValue => setPrice(priceValue)} />
          </Box>
          <FormControl.Label _text={{ bold: true }}>Description:</FormControl.Label>
          <Box maxW="full">
            <TextArea h={20} value={description}
            onChangeText={text => setDescription(text)}
            placeholder="Please enter incident details"
            w="100%" maxW="full" autoCompleteType={undefined} />
          </Box>
          <FormControl.Label _text={{ bold: true }}>Duration (in minutes):</FormControl.Label>
          <Box>
            <Input keyboardType="numeric" value={duration.toString()} onChangeText={durationValue => {
                let durationRounded = Number(Number(durationValue).toFixed());
                setDuration(durationRounded);
            }} />
          </Box>
          <FormControl.Label _text={{ bold: true }}>Day:</FormControl.Label>
          <Box maxW="full">
            <Select
              selectedValue={String(day)}
              minWidth="full"
              accessibilityLabel="Choose report type"
              placeholder="Choose report type"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setDay(itemValue)}
            >
              <Select.Item label="Monday" value="MONDAY" />
              <Select.Item label="Tuesday" value="TEUSDAY" />
              <Select.Item label="Wednesday" value="WEDNESDAY" />
              <Select.Item label="Thursday" value="THURSDAY" />
              <Select.Item label="Friday" value="FRIDAY" />
              <Select.Item label="Saturday" value="SATURDAY" />
              <Select.Item label="Sunday" value="SUNDAY" />
            </Select>
          </Box>
          <FormControl.Label _text={{ bold: true }}>Time:</FormControl.Label>
          <Box maxW="full">
            <Select
              selectedValue={String(time)}
              minWidth="full"
              accessibilityLabel="Choose report type"
              placeholder="Choose report type"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setTime(itemValue)}
            >
              <Select.Item label="Morning" value="MORNING" />
              <Select.Item label="Afternoon" value="AFTERNOON" />
              <Select.Item label="Evening" value="EVENING" />
              <Select.Item label="Any" value="ANY" />
            </Select>
          </Box>
          <FormControl.Label _text={{ bold: true }}>Pet Type:</FormControl.Label>
          <Box maxW="full">
            <Select
              selectedValue={String(petType)}
              minWidth="full"
              accessibilityLabel="Choose report type"
              placeholder="Choose report type"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setPetType(itemValue)}
            >
              <Select.Item label="Dog" value="DOG" />
              <Select.Item label="Cat" value="CAT" />
              <Select.Item label="Bird" value="BIRD" />
              <Select.Item label="Fish" value="FISH" />
              <Select.Item label="Other" value="OTHER" />
            </Select>
          </Box>
        </VStack>
        
        <Button
          className="w-[300px] m-auto mt-10"
          onPress={() => handleSubmit()}
        >
          Add Service
        </Button>
      </FormControl>
    </Box>
    </KeyboardAwareScrollView>
  )
}
