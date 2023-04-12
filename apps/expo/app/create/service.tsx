import React, { useState } from 'react';
import { View, Input, Text, Button, Checkbox, Select, ScrollView, TextArea } from 'native-base';
import { useRouter } from 'expo-router';
import { api } from 'app/utils/trpc'
import { sessionAtom } from 'app/utils/storage';
import { useAtom } from 'jotai';
import AvailableDaySelect from 'app/components/AvailableDaySelect';
import AvailableTimeSelect from 'app/components/AvailableTimeSelect';
import PetTypeSelect from 'app/components/PetTypeSelect';

export default function services() {
    const router = useRouter()

    const [serviceType, setServiceType] = useState("");
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');

    const [days, setDays] = useState({
        "MONDAY": false,
        "TUESDAY": false,
        "WEDNESDAY": false,
        "THURSDAY": false,
        "FRIDAY": false,
        "SATURDAY": false,
        "SUNDAY": false,
    });

    const [times, setTimes] = useState({
        "MORNING": false,
        "AFTERNOON": false,
        "EVENING": false,
    });

    const [petType, setPetType] = useState({
        "DOG": false,
        "CAT": false,
        "OTHER": false,
    });

    const [session, _] = useAtom(sessionAtom)
    const mutation = api.service.create.useMutation()


    const handleSubmit = () => {
        const availableTimes = [];
        for (const day in days) {
            if (days[day]) {
                for (const time in times) {
                    if (times[time]) {
                        availableTimes.push({
                            day,
                            time,
                        })
                    }
                }
            }
        }

        const petTypes = [];
        for (const pet in petType) {
            if (petType[pet]) {
                petTypes.push(pet)
            }
        }

        mutation.mutateAsync({
            sitterId: session.sitterId,
            serviceType: serviceType,
            price: Number(price),
            petTypes: petTypes,
            description: description,
            duration: Number(duration),
            availableTimes,
        }).then(
          () => {
            router.replace('/services')
          }
        )
    }

    return (
        <>
          <ScrollView>
          <View className='flex-col m-8 mt-4'>
                <View className='flex-col my-5'>
                    <Text className='font-bold text-2xl'>Choose a Service:</Text>
                    <Text className='mb-4'>what service do you want to offer?</Text>
                    <Select
                        variant='rounded'
                        placeholder="Select a service"
                        selectedValue={serviceType}
                        onValueChange={(value) => setServiceType(value)}
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
                        value={price} 
                        onChangeText={setPrice}
                        InputLeftElement={<Text className='ml-4'>£</Text>} 
                        keyboardType='numeric'
                    />
                </View>

                <View className='flex-col my-5'>
                    <Text className='font-bold text-2xl'>Pets:</Text>
                    <Text className='mb-4'>What pets do you want to take care of?</Text>
                    <PetTypeSelect value={petType} onChange={setPetType} />
                </View>

                <View className='flex-col my-5'>
                    <Text className='font-bold text-2xl mb-4'>Availability:</Text>
                    <View className='mb-6'>
                        <AvailableDaySelect value={days} onChange={setDays} />
                    </View>
                    <View>
                        <AvailableTimeSelect value={times} onChange={setTimes} />
                    </View>
                </View>

                <View className='flex-col my-5'>
                    <Text className='font-bold text-2xl'>Description:</Text>
                    <Text className='mb-4'>Tell pet owners a bit about what you provide for this service.</Text>
                    <TextArea 
                        h={20} 
                        placeholder="Text Area Placeholder" 
                        value={description}
                        w="100%" 
                        autoCompleteType={undefined} 
                        onChangeText={
                            (text) => setDescription(text) 
                        }
                    />
                </View>

                <View className='flex-col my-5'>
                    <Text className='font-bold text-2xl'>Duration:</Text>
                    <Text className='mb-4'>How long do you want to spend with each pet?</Text>
                    <Select
                        variant='rounded'
                        placeholder="Select a duration"
                        selectedValue={duration}
                        onValueChange={(value) => setDuration(value)}
                    >
                        <Select.Item label="30 minutes" value="30" />
                        <Select.Item label="1 hour" value="60" />
                        <Select.Item label="2 hours" value="120" />
                    </Select>
                </View>

                <View className='flex-col my-5'>
                    <Button className='h-12 rounded-full bg-blue-500 w-11/12 my-4 mx-auto' onPress={() => handleSubmit()}>
                        <Text className='text-white'>Submit</Text>
                    </Button>
                </View>
            </View>

          </ScrollView>
        </>
    );
}
