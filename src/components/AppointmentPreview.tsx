//Import @React-navigation/native
import { useNavigation } from '@react-navigation/native';
import { Image, Text } from 'react-native';
import { Button, Box, FormControl, Avatar } from 'native-base';
import { Ionicons } from '@expo/vector-icons'
import React from "react";


type AppointmentPreviewProps = {
    id: number,
    imageUrl: string;
    sitterName: string;
    appointment: string;
    dateDescription: string;
    timeDescription: string;
    bookingFrequency: string;
}

export default function AppointmentsPreview(props: AppointmentPreviewProps) {
    const navigation = useNavigation();

    const handlePress = () => {
        const appointmentData = {
          id: props.id,
          imageUrl: props.imageUrl,
          sitterName: props.sitterName,
          appointment: props.appointment,
          dateDescription: props.dateDescription,
          timeDescription: props.timeDescription,
          bookingFrequency: props.bookingFrequency
        };
        navigation.navigate('AppointmentDetails', { appointmentData });
      };

    return(
        <Button onPress={handlePress} className='m-auto rounded-2xl w-80 bg-[#4c8ab9] mt-6 h-30 hover:bg-[#4c8ab9]  border-solid border-transparent border-2'>
            <Box className='bg-[#4c8ab9] rounded-2xl p-4 w-80 h-25 mb-2 flex-wrap flex-row justify-between'>
                <Box className='flex-start' style={{ flexDirection: 'row' }}>
                    <Avatar source={{uri: props.imageUrl}} className='w-12 h-12 md:w-48 md:h-auto float-left'></Avatar>
                    <Box className='ml-4 float-left'>
                        <Text className='font-bold text-lg'>{props.sitterName}</Text>
                        <Text>{props.appointment}</Text>
                        {/* <Text>{props.dateDescription}</Text> */}
                    </Box>
                </Box>
                <Text className='flex-end'>{props.bookingFrequency}</Text>
            </Box>
            <Box className='ml-4 flex-wrap flex-row'>
                <Ionicons size={24} className='flex-start' name="ios-calendar-outline"></Ionicons>
                <Text className='mx-2 text-md'>{props.dateDescription}</Text>
                <Ionicons size={24} name="ios-time-outline"></Ionicons>
                <Text className='mx-2 text-md'>{props.timeDescription}</Text>
            </Box>
        </Button>
    );
}
