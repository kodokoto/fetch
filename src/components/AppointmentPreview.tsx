//Import @React-navigation/native
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Image, Text } from 'react-native';
import { Avatar, Button, Box, NativeBaseProvider } from 'native-base';
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
            <Button onPress={handlePress} height="120" width="40" borderColor="coolGray.200" borderWidth="1" alignSelf="center">
                <Box maxW="80" rounded="lg" maxH="200">
                    <Avatar source={{uri: "../assets/userIcon.png"}}>Js</Avatar>
                    <Text>Jessica</Text>
                    <Text>walk with fufu</Text>
                    <Text>next friday at 10am</Text>
                    <Text>weekly</Text>
                </Box>
            </Button> 
        </NativeBaseProvider>

    );
}