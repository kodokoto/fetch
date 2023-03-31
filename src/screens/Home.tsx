import { View, Text } from 'react-native'
import { Box } from 'native-base'
import React from 'react'
import ProfileIcon from '../components/ProfileIcon'
import WelcomeMessage from '../components/WelcomeMessage'

export const mockUserData = {
  iconUrl: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  userName: 'Joey'
}

export default function Home() {
  return (
    <View>
      <Box className='flex-wrap flex-row'>
        <WelcomeMessage{...mockUserData}/>
        <ProfileIcon{...mockUserData}/>
      </Box>
    </View>
  )
}