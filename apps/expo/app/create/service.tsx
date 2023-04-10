import React, { useState } from 'react';
import { View, Input, Text, Button, Checkbox, Select, ScrollView, TextArea } from 'native-base';
import { useRouter } from 'expo-router';
import { api } from 'app/utils/trpc'
import { sessionAtom } from 'app/utils/storage';
import { useAtom } from 'jotai';
import { FontAwesome5 } from '@expo/vector-icons';

type AvailableDays = {
    MONDAY: boolean;
    TUESDAY: boolean;
    WEDNESDAY: boolean;
    THURSDAY: boolean;
    FRIDAY: boolean;
    SATURDAY: boolean;
    SUNDAY: boolean;
}

type AvailableTimes = {
    MORNING: boolean;
    AFTERNOON: boolean;
    EVENING: boolean;
}

type AvailablepetType = {
    DOG: boolean;
    CAT: boolean;
    OTHER: boolean;
}

function prettifyDay(day: string) {
    // two letters, first letter capitalized and second letter lowercase
    return day[0] + day[1].toLowerCase();
}

// capitalise the first letter of a string and lowercase the rest
function titleCase(str: string) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function DayToggle({value, onChange} : {value: AvailableDays, onChange: (value: AvailableDays) => void}) {

    const handleDayChange = (day, newValue) => {
        onChange({
            ...value,
            [day]: newValue,
        });
    };

    return (
        <View className='flex-row justify-center divide-x-8 '>
            <DayToggleButton roundedLeft day='MONDAY' value={value.MONDAY} onChange={handleDayChange} />
            <DayToggleButton day="TEUSDAY" value={value.TUESDAY} onChange={handleDayChange} />
            <DayToggleButton day="WEDNESDAY" value={value.WEDNESDAY} onChange={handleDayChange} />
            <DayToggleButton day="THURSDAY" value={value.THURSDAY} onChange={handleDayChange} />
            <DayToggleButton day="FRIDAY" value={value.FRIDAY} onChange={handleDayChange} />
            <DayToggleButton day="SATURDAY" value={value.SATURDAY} onChange={handleDayChange} />
            <DayToggleButton roundedRight day="SUNDAY" value={value.SUNDAY} onChange={handleDayChange} />
        </View>
    )
}

function DayToggleButton({ day, value, onChange, roundedLeft = false, roundedRight = false }: { day: string, value: boolean, onChange: (day: string,value: boolean) => void, roundedLeft?: boolean, roundedRight?: boolean }) {
    const className = 'roounded-l-full';
    return (
        <Button 
            className={`flex-row w-12 h-12 justify-center items-center text-center bg-transparent border-2 rounded-none ${className}`}
            onPress={() => onChange(day, !value)}
            style={{ 
                borderColor: value ? '#808080' : '#C5C5C5',
                borderTopLeftRadius: roundedLeft ? 10 : 0,
                borderBottomLeftRadius: roundedLeft ? 10 : 0,
                borderTopRightRadius: roundedRight ? 10 : 0,
                borderBottomRightRadius: roundedRight ? 10 : 0,
            }}
        >   
            <Text>{prettifyDay(day)}</Text>
        </Button>
    )
}

function TimeToggle({value, onChange} : {value: AvailableTimes, onChange: (value: AvailableTimes) => void}) {

    const handleChange = (key, newValue) => {
        onChange({
            ...value,
            [key]: newValue,
        });
    };

    return (
        <View className='flex-row justify-center divide-x-8 '>
            <TimeToggleButton time='MORNING' value={value.MORNING} onChange={handleChange} />
            <TimeToggleButton time='AFTERNOON' value={value.AFTERNOON} onChange={handleChange} />
            <TimeToggleButton time='EVENING' value={value.EVENING} onChange={handleChange} />
        </View>
    )
}

function TimeToggleButton({ time, value, onChange }: { time: string, value: boolean, onChange: (time: string,value: boolean) => void}) {

    return (
        <Button 
            className={`flex-row w-24 h-12 mx-3 justify-center items-center text-center bg-transparent border-2 rounded-[10px]`}
            onPress={() => onChange(time, !value)}
            style={{ 
                borderColor: value ? '#808080' : '#C5C5C5',
            }}
        >   
            <Text>{titleCase(time)}</Text>
        </Button>
    )
}

function AnimalToggle({value, onChange} : {value: AvailablepetType, onChange: (value: AvailablepetType) => void}) {

    const handleChange = (key, newValue) => {
        onChange({
            ...value,
            [key]: newValue,
        });
    };

    return (
        <View className='flex-row justify-center divide-x-8 '>
            <AnimalToggleButton animal='DOG' value={value.DOG} onChange={handleChange} icon={ <FontAwesome5 name="dog" size={16} color="black" />}/>
            <AnimalToggleButton animal='CAT' value={value.CAT} onChange={handleChange} icon={ <FontAwesome5 name="cat" size={16} color="black" />}/> 
            <AnimalToggleButton animal='OTHER' value={value.OTHER} onChange={handleChange} /> 
        </View>
    )
}
// icon is optional
function AnimalToggleButton({ animal, value, onChange, icon }: { animal: string, value: boolean, onChange: (animal: string,value: boolean) => void, icon?: JSX.Element}) {
  
    return (
        <Button
            className={`flex-row w-24 h-12 mx-3 justify-center items-center text-center bg-transparent border-2 rounded-[10px]`}
            onPress={() => onChange(animal, !value)}
            style={{
                borderColor: value ? '#808080' : '#C5C5C5',
            }}
        >
          <View className='flex-row items-center'>
            { icon && <View className='mr-2'>{ icon }</View> }
            <Text>{titleCase(animal)}</Text>
          </View>
         
        </Button>
    )
}

    

export default function services() {
    const router = useRouter()

    const [serviceType, setServiceType] = useState("");
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');

    const [days, setDays] = useState<AvailableDays>({
        "MONDAY": false,
        "TUESDAY": false,
        "WEDNESDAY": false,
        "THURSDAY": false,
        "FRIDAY": false,
        "SATURDAY": false,
        "SUNDAY": false,
    });

    const [times, setTimes] = useState<AvailableTimes>({
        "MORNING": false,
        "AFTERNOON": false,
        "EVENING": false,
    });

    const [petType, setPetType] = useState<AvailablepetType>({
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
          () => router.replace('/services')
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
                    <Text className='font-bold text-2xl'>petType:</Text>
                    <Text className='mb-4'>What petType do you want to take care of?</Text>
                    <AnimalToggle value={petType} onChange={setPetType} />
                </View>

                <View className='flex-col my-5'>
                    <Text className='font-bold text-2xl mb-4'>Availability:</Text>
                    <View className='mb-6'>
                        <DayToggle value={days} onChange={setDays} />
                    </View>
                    <View>
                        <TimeToggle value={times} onChange={setTimes} />
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
// const router = useRouter();

// const [session, setSession] = useAtom(sessionAtom)
// const mutation = api.service.create.useMutation()
// const sitterid = session.sitterId

// let handleSubmit = () => {
//     console.log(123);
//     console.log("Service Type: " + serviceType);
//     console.log("Pet Type: " + petType);
//     console.log("Description: " + description);
//     console.log("Price: " + Number(price).toFixed(2));
//     console.log("Duration: " + duration);

//     mutation.mutate({
//         sitterId: sitterid,
//         serviceType: serviceType,
//         price: Number(Number(price).toFixed(2)),
//         description: description,
//         duration: duration,
//         petType: petType,
//         availableTimes: [
//             {
//                 day: day,
//                 time: time
//             }
//         ]
//       })
  
//       router.push(`/home`);
// }
// return (
// <KeyboardAwareScrollView>
//     <Box>
//   <FormControl isRequired>
//     <VStack space={4} className="mt-8 mx-8">
//       <FormControl.Label _text={{ bold: true }}>Service Type:</FormControl.Label>
//       <Box maxW="full">
//         <Select
//           selectedValue={String(serviceType)}
//           minWidth="full"
//           accessibilityLabel="Choose report type"
//           placeholder="Choose report type"
//           _selectedItem={{
//             bg: 'teal.600',
//             endIcon: <CheckIcon size="5" />,
//           }}
//           mt={1}
//           onValueChange={(itemValue) => setServiceType(itemValue)}
//         >
//           <Select.Item label="Walk" value="WALK" />
//           <Select.Item label="Pet Care" value="PET_CARE" />
//           <Select.Item label="House Sitting" value="HOUSE_SITTING" />
//         </Select>
//       </Box>
//       <FormControl.Label _text={{ bold: true }}>Price:</FormControl.Label>
//       <Box>
//       <Input keyboardType="numeric" value={price} onChangeText={priceValue => setPrice(priceValue)} />
//       </Box>
//       <FormControl.Label _text={{ bold: true }}>Description:</FormControl.Label>
//       <Box maxW="full">
//         <TextArea h={20} value={description}
//         onChangeText={text => setDescription(text)}
//         placeholder="Please enter incident details"
//         w="100%" maxW="full" autoCompleteType={undefined} />
//       </Box>
//       <FormControl.Label _text={{ bold: true }}>Duration (in minutes):</FormControl.Label>
//       <Box>
//         <Input keyboardType="numeric" value={duration.toString()} onChangeText={durationValue => {
//             let durationRounded = Number(Number(durationValue).toFixed());
//             setDuration(durationRounded);
//         }} />
//       </Box>
//       <FormControl.Label _text={{ bold: true }}>Day:</FormControl.Label>
//       <Box maxW="full">
//         <Select
//           selectedValue={String(day)}
//           minWidth="full"
//           accessibilityLabel="Choose report type"
//           placeholder="Choose report type"
//           _selectedItem={{
//             bg: 'teal.600',
//             endIcon: <CheckIcon size="5" />,
//           }}
//           mt={1}
//           onValueChange={(itemValue) => setDay(itemValue)}
//         >
//           <Select.Item label="Monday" value="MONDAY" />
//           <Select.Item label="Tuesday" value="TEUSDAY" />
//           <Select.Item label="Wednesday" value="WEDNESDAY" />
//           <Select.Item label="Thursday" value="THURSDAY" />
//           <Select.Item label="Friday" value="FRIDAY" />
//           <Select.Item label="Saturday" value="SATURDAY" />
//           <Select.Item label="Sunday" value="SUNDAY" />
//         </Select>
//       </Box>
//       <FormControl.Label _text={{ bold: true }}>Time:</FormControl.Label>
//       <Box maxW="full">
//         <Select
//           selectedValue={String(time)}
//           minWidth="full"
//           accessibilityLabel="Choose report type"
//           placeholder="Choose report type"
//           _selectedItem={{
//             bg: 'teal.600',
//             endIcon: <CheckIcon size="5" />,
//           }}
//           mt={1}
//           onValueChange={(itemValue) => setTime(itemValue)}
//         >
//           <Select.Item label="Morning" value="MORNING" />
//           <Select.Item label="Afternoon" value="AFTERNOON" />
//           <Select.Item label="Evening" value="EVENING" />
//           <Select.Item label="Any" value="ANY" />
//         </Select>
//       </Box>
//       <FormControl.Label _text={{ bold: true }}>Pet Type:</FormControl.Label>
//       <Box maxW="full">
//         <Select
//           selectedValue={String(petType)}
//           minWidth="full"
//           accessibilityLabel="Choose report type"
//           placeholder="Choose report type"
//           _selectedItem={{
//             bg: 'teal.600',
//             endIcon: <CheckIcon size="5" />,
//           }}
//           mt={1}
//           onValueChange={(itemValue) => setPetType(itemValue)}
//         >
//           <Select.Item label="Dog" value="DOG" />
//           <Select.Item label="Cat" value="CAT" />
//           <Select.Item label="Bird" value="BIRD" />
//           <Select.Item label="Fish" value="FISH" />
//           <Select.Item label="Other" value="OTHER" />
//         </Select>
//       </Box>
//     </VStack>
    
//     <Button
//       className="w-[300px] m-auto mt-10"
//       onPress={() => handleSubmit()}
//     >
//       Add Service
//     </Button>
//   </FormControl>
// </Box>
// </KeyboardAwareScrollView>