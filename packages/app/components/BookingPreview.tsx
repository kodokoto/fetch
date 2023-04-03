//Import @React-navigation/native
import { useRouter } from 'expo-router';
import { Image, Text } from 'react-native';
import { Button, Box, FormControl, Avatar } from 'native-base';
import { Ionicons } from '@expo/vector-icons'
import React from "react";
import { Booking } from '@prisma/client';
import { trpc } from '../utils/trpc';

function getDateDescription(date: Date) {
    // desired output format: "Monday, 1 April"
    const options = { weekday: "long", year: 'numeric', month: 'long', day: 'numeric' } as const;
    return date.toLocaleDateString('en-US', options); 
}

function getTimeDescription(start: Date, end: Date) {
    // desired output format: "10:00- 13:00"
    let s = new Date(start);
    let e = new Date(end);
    const options = { hour: 'numeric', minute: 'numeric' } as const;
    return `${s.toLocaleTimeString('en-US', options)} - ${e.toLocaleTimeString('en-US', options)}`;
}

function parseBookingFrequency(bookingFrequency: string) {
    switch (bookingFrequency) {
        case 'ONE_OFF':
            return 'one';
        case 'WEEKLY':
            return 'every week';
        case 'BI_WEEKLY':
            return 'every two weeks';
        case 'MONTHLY':
            return 'every month';
        default:
            return '';
    }
}


export default function BookingPreview(props: Booking) {

    const router = useRouter();
    console.log(props)

    const { data, error, isLoading } = trpc.sitter.byId.useQuery(props.sitterId);

    const handlePress = () => {
        router.push({
            pathname: `/booking/${props.id}`,
            params: { bookingId: props.id }
        })
    };

    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>{error.message}</Text>;
    for (let i = 0; i < 10; i++) {
        console.log('data');
    }
    console.log(data);
    return(
        <Button onPress={handlePress} className='m-auto rounded-2xl w-80 bg-[#4c8ab9] mt-6 h-30 hover:bg-[#4c8ab9]  border-solid border-transparent border-2'>
            <Box className='bg-[#4c8ab9] rounded-2xl p-4 w-80 h-25 mb-2' style={{ flexDirection: 'row' }}>
                {/* <Avatar source={{uri: data.imageUrl}} className='w-12 h-12 md:w-48 md:h-auto float-left'></Avatar> */}
                <Box className='ml-4 float-left'>
                    <Text className='font-bold text-lg'>{data.name}</Text>
                    <Text>{'test'}</Text>
                    {/* <Text>{props.dateDescription}</Text> */}
                </Box>
                <Text className='ml-24 mr-12 mt-0'>{parseBookingFrequency(props.frequency)}</Text>
            </Box>
            <Box className='ml-4 flex-wrap flex-row'>
                <Ionicons size={24} className='flex-start' name="ios-calendar-outline"></Ionicons>
                {/* <Text>{typeof props.startDate}</Text> */}
                {/* <Text className='mx-2 text-md'>{getDateDescription(props.startDate)}</Text> */}
                <Ionicons size={24} name="ios-time-outline"></Ionicons>
                <Text className='mx-2 text-md'>{getTimeDescription(props.startDate, props.endDate)}</Text>
            </Box>
        </Button>
    );
}