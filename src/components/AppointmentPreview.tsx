//Import @React-navigation/native
import { useNavigation } from '@react-navigation/native';
import { Image, Text } from 'react-native';
import { Button, Box, FormControl } from 'native-base';
import React from "react";


type AppointmentPreviewProps = {
    id: number,
    imageUrl: string;
    sitterName: string;
    appointment: string;
    dateDescription: string;
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
          bookingFrequency: props.bookingFrequency
        };
        navigation.navigate('AppointmentDetails', { appointmentData });
      };

    return(
        <Button onPress={handlePress} className='m-auto w-80 bg-slate-100 mt-6 h-40 hover:bg-[#4c8ab9]'>
            <Box className='bg-slate-100 rounded-xl p-4 dark:bg-slate-800 w-80 h-40 ml-4 border-solid border-transparent border-2' style={{ flexDirection: 'row' }}>
                <Image source={{uri: props.imageUrl}} className='w-24 h-24 md:w-48 md:h-auto mt-4 float-left'></Image>
                <Box className='ml-4 float-left mt-4'>
                    <Text className='font-bold text-lg'>{props.sitterName}</Text>
                    <Text>{props.appointment}</Text>
                    <Text>{props.dateDescription}</Text>
                </Box>
                <Text className='mr-12 mt-0'>{props.bookingFrequency}</Text>
            </Box>
        </Button>
    );
}