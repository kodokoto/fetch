import React, { useState } from 'react';
import { View, Input, Text, Button, Checkbox, Select, ScrollView } from 'native-base';
import { Pressable } from 'react-native';
import { Stack } from 'expo-router';

enum Day {
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY',
    SUNDAY = 'SUNDAY',
}

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
            <DayToggleButton roundedLeft day={Day.MONDAY} value={value.MONDAY} onChange={handleDayChange} />
            <DayToggleButton day={Day.TUESDAY} value={value.TUESDAY} onChange={handleDayChange} />
            <DayToggleButton day={Day.WEDNESDAY} value={value.WEDNESDAY} onChange={handleDayChange} />
            <DayToggleButton day={Day.THURSDAY} value={value.THURSDAY} onChange={handleDayChange} />
            <DayToggleButton day={Day.FRIDAY} value={value.FRIDAY} onChange={handleDayChange} />
            <DayToggleButton day={Day.SATURDAY} value={value.SATURDAY} onChange={handleDayChange} />
            <DayToggleButton roundedRight day={Day.SUNDAY} value={value.SUNDAY} onChange={handleDayChange} />
        </View>
    )
}

function DayToggleButton({ day, value, onChange, roundedLeft = false, roundedRight = false }: { day: Day, value: boolean, onChange: (day: Day,value: boolean) => void, roundedLeft?: boolean, roundedRight?: boolean }) {

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

    const handleTimeChange = (time, newValue) => {
        onChange({
            ...value,
            [time]: newValue,
        });
    };

    return (
        <View className='flex-row justify-center divide-x-8 '>
            <TimeToggleButton time='MORNING' value={value.MORNING} onChange={handleTimeChange} />
            <TimeToggleButton time='AFTERNOON' value={value.AFTERNOON} onChange={handleTimeChange} />
            <TimeToggleButton time='EVENING' value={value.EVENING} onChange={handleTimeChange} />
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
    

export default function services() {
    const [selectedService, setSelectedService] = useState("");
    const [rate, setRate] = useState('');

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

    const handleSubmit = () => {
        console.log('submit');
    }

    return (
        <>
            <View className='flex-col m-8 mt-4'>
                <View className='flex-col my-4'>
                    <Text className='font-bold text-2xl'>Choose a Service:</Text>
                    <Text className='mb-4'>what service do you want to offer?</Text>
                    <Select
                        variant='rounded'
                        placeholder="Select a service"
                        selectedValue={selectedService}
                        onValueChange={(value) => setSelectedService(value)}
                    >
                        <Select.Item label="Walk" value="WALK" />
                        <Select.Item label="Pet Care" value="PET_CARE" />
                        <Select.Item label="House Sitting" value="HOUSE_SITTING" />
                    </Select>
                </View>
                <View className='flex-col my-4'>
                    <Text className='font-bold text-2xl'>Rates:</Text>
                    <Text className='mb-4'>What do you want pet owners to pay per visit?</Text>
                    <Input 
                        variant={'rounded'} 
                        placeholder="Enter a rate" 
                        value={rate} 
                        onChangeText={setRate}
                        InputLeftElement={<Text className='ml-4'>£</Text>} 
                        keyboardType='numeric'
                    />
                </View>
                <View className='flex-col my-4'>
                    <Text className='font-bold text-2xl mb-4'>Availability:</Text>
                    <View className='mb-6'>
                        <DayToggle value={days} onChange={setDays} />
                    </View>
                    <View>
                        <TimeToggle value={times} onChange={setTimes} />
                    </View>
                </View>
                <View className='flex-col my-4'>
                    <Button className='h-12 rounded-full bg-blue-500 w-11/12 my-4 mx-auto' onPress={() => handleSubmit()}>
                        <Text className='text-white'>Submit</Text>
                    </Button>
                </View>
            </View>
        </>
    );
}
