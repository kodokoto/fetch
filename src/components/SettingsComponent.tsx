import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Box } from 'native-base'

function SettingsComponent() {
    const navigation = useNavigation()

    return (
        <View>
            <Box flex={1} bg="#fff" p={4}>
            {/* Button to take you to Visual Settings Screen */}
            <Button title="About us" onPress={() => navigation.navigate('AboutUs')} />
            <Button title="Visual Settings" onPress={() => navigation.navigate('VisualSettings')} /> 
            {/* Button to take you to Terms and Conditions Screen */}
            <Button title="Terms and Conditions" onPress={() => navigation.navigate('TermsAndConditions')} />
            <Button title="Privacy Policy" />
            <Button title="Contact Us" />
            <Button title="FAQ" onPress={() => navigation.navigate('FAQ')} />
            <Button title="Log Out" /> 
            <Button title="Delete Account" />
            <Button title="Developer Settings" />
            </Box>
        </View>
    )
}

export default SettingsComponent

