import { View, Text, Button } from 'react-native'
import React from 'react'
import SettingsComponent from '../components/SettingsComponent'



export default function Settings({navigation}) {

    return (
        <View>
            <SettingsComponent navigation={navigation}/>
        </View>


    )
}