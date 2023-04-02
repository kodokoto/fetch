import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

function SettingsComponent() {
    const navigation = useNavigation()

    return (
        <View>
            <Text className="text-green-500">Test</Text>
            {/* Button to take you to Visual Settings Screen */}
            <Button title="Visual Settings" onPress={() => navigation.navigate('VisualSettings')} />
            <Button title="Change Light/Dark Mode" />
            <Button title="Delete Account" />
            {/* Button to take you to Terms and Conditions Screen */}
            <Button title="Terms and Conditions" onPress={() => navigation.navigate('TermsAndConditions')} />
            <Button title="Developer Settings" />
        </View>
    )
}

export default SettingsComponent

