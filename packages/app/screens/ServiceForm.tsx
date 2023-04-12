import { View, Text } from 'react-native'
import React from 'react'
import { Select, Input, TextArea, Button } from 'native-base'
import PetTypeSelect from '../components/PetTypeSelect'
import AvailableDaySelect from '../components/AvailableDaySelect'
import AvailableTimeSelect from '../components/AvailableTimeSelect'

type AvailableDays = {
    "MONDAY": boolean,
    "TUESDAY": boolean,
    "WEDNESDAY": boolean,
    "THURSDAY": boolean,
    "FRIDAY": boolean,
    "SATURDAY": boolean,
    "SUNDAY": boolean,
}

type AvailableTimes = {
    "MORNING": boolean,
    "AFTERNOON": boolean,
    "EVENING": boolean,
}    

type petType = {
    "DOG": boolean,
    "CAT": boolean,
    "OTHER": boolean,
}

type ServiceFormData = {
    serviceType: string,
    price: string,
    duration: string,
    description: string,
    petTypes: petType,
    days: AvailableDays,
    times: AvailableTimes,
    setServiceType: (value: string) => void,
    setPrice: (value: string) => void,
    setDuration: (value: string) => void,
    setDescription: (value: string) => void,
    setPetTypes: (value: petType) => void,
    setDays: (value: AvailableDays) => void,
    setTimes: (value: AvailableTimes) => void,
    handleSubmit: () => void,
}

export default function ServiceForm(formData: ServiceFormData) {
  return (
    <View className='flex-col m-8 mt-4'>
    <View className='flex-col my-5'>
        <Text className='font-bold text-2xl'>Choose a Service:</Text>
        <Text className='mb-4'>what service do you want to offer?</Text>
        <Select
            variant='rounded'
            placeholder="Select a service"
            selectedValue={formData.serviceType}
            onValueChange={(value) => formData.setServiceType(value)}
        >
            <Select.Item label="Walk" value="WALK" />
            <Select.Item label="Pet Care" value="PET_CARE" />
            <Select.Item label="House Sitting" value="HOUSE_SITTING" />
        </Select>
    </View>
    <View className='flex-col my-5'>
        <Text className='font-bold text-2xl'>Rates:</Text>
        <Text className='mb-4'>What do you want pet owners to pay per visit?</Text>
        <Input 
            variant={'rounded'} 
            placeholder="Enter a rate" 
            value={formData.price} 
            onChangeText={formData.setPrice}
            InputLeftElement={<Text className='ml-4'>£</Text>} 
            keyboardType='numeric'
        />
    </View>

    <View className='flex-col my-5'>
        <Text className='font-bold text-2xl'>Pets:</Text>
        <Text className='mb-4'>What pets do you want to take care of?</Text>
        <PetTypeSelect value={formData.petTypes} onChange={formData.setPetTypes} />
    </View>

    <View className='flex-col my-5'>
        <Text className='font-bold text-2xl mb-4'>Availability:</Text>
        <View className='mb-6'>
            <AvailableDaySelect value={formData.days} onChange={formData.setDays} />
        </View>
        <View>
            <AvailableTimeSelect value={formData.times} onChange={formData.setTimes} />
        </View>
    </View>

    <View className='flex-col my-5'>
        <Text className='font-bold text-2xl'>Description:</Text>
        <Text className='mb-4'>Tell pet owners a bit about what you provide for this service.</Text>
        <TextArea 
            h={20} 
            placeholder="Text Area Placeholder" 
            value={formData.description}
            w="100%" 
            autoCompleteType={undefined} 
            onChangeText={
                (text) => formData.setDescription(text) 
            }
        />
    </View>

    <View className='flex-col my-5'>
        <Text className='font-bold text-2xl'>Duration:</Text>
        <Text className='mb-4'>How long do you want to spend with each pet?</Text>
        <Select
            variant='rounded'
            placeholder="Select a duration"
            selectedValue={formData.duration}
            onValueChange={(value) => formData.setDuration(value)}
        >
            <Select.Item label="30 minutes" value="30" />
            <Select.Item label="1 hour" value="60" />
            <Select.Item label="2 hours" value="120" />
        </Select>
    </View>

    <View className='flex-col my-5'>
        <Button className='h-12 rounded-full bg-blue-500 w-11/12 my-4 mx-auto' onPress={() => formData.handleSubmit()}>
            <Text className='text-white'>Submit</Text>
        </Button>
    </View>
</View>
  )
}