//Import @React-navigation/native
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Image, Text } from 'react-native';
import { Button, Box, NativeBaseProvider } from 'native-base';
//Import pages from screens
import Appointment from '../screens/Appointment';
// import HomeScreen from '../screens/Home';
import React, { Component } from "react";


export default function AppointmentsPreview() {
    // imageUrl: String;
    // sitterName: String;
    // Appointment: String;
    // dateDescription: String;
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('AppointmentDetails');
    }

    return(
        <NativeBaseProvider>
            <Button onPress={handlePress} className='items-center w-96 bg-transparent mt-20 h-12'>
                <Box className='bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800 w-80 h-48 ml-4 border-solid border-transparent border-2' style={{ flexDirection: 'row' }}>
                    <Image source={require('../assets/userIcon.png')} className='w-24 h-24 md:w-48 md:h-auto float-left mt-4'></Image>
                    <Box className='ml-4 mt-8' >
                        <Text className='font-bold text-lg'>Jessica</Text>
                        <Text>walk with fufu</Text>
                        <Text>next friday at 10am</Text>
                    </Box>
                    <Text className='mr-8'>weekly</Text>
                </Box>
            </Button> 
        </NativeBaseProvider>


    );
}