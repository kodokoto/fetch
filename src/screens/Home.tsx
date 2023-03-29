import { View, Text } from 'react-native'
import React from 'react'
//import components from components
import WelcomeMessage from '../components/WelcomeMessage';

export const mockUserData = {
  userName: 'Joey'
}

export default function Home() {
  return (
    <View>
      <WelcomeMessage{...mockUserData}/>
    </View>
  )
}