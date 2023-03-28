//Import @React-navigation/native
import { useNavigation } from '@react-navigation/native';
import { Image, Text } from 'react-native';
import { Button, Box, NativeBaseProvider } from 'native-base';
import React from "react";


type AppointmentPreviewProps = {
    imageUrl: string;
    sitterName: string;
    appointment: string;
    dateDescription: string;
    bookingFrequency: string;
}

export default function AppointmentsPreview(props: AppointmentPreviewProps) {
    imageUrl: '../assets/userIcon.png';
    sitterName: 'Jessica';
    appointment: 'walk with fufu';
    dateDescription: 'next friday at 10am';
    bookingFrequency: 'weekly';
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('AppointmentDetails');
    }

    return(
        <Button onPress={handlePress} className='items-center w-96 bg-transparent mt-12 h-48'>
            <Box className='bg-slate-100 rounded-xl p-4 md:p-0 dark:bg-slate-800 w-80 h-40 ml-4 border-solid border-transparent border-2' style={{ flexDirection: 'row' }}>
                <Image source={require('../assets/userIcon.png')} className='w-24 h-24 md:w-48 md:h-auto mt-4 float-left'></Image>
                <Box className='ml-4 float-left mt-4'>
                    <Text className='font-bold text-lg'>Jessica</Text>
                    <Text>walk with fufu</Text>
                    <Text>next friday at 10am</Text>
                </Box>
                <Text className='mr-12 mt-0'>weekly</Text>
            </Box>
        </Button> 
    );
}