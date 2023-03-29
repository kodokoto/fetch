import { View, Text } from 'react-native'
import React from 'react'
import ProfileIcon from '../components/ProfileIcon'

export const mockUserData = {
  iconUrl: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
}

export default function Home() {
  return (
    <View>
      <ProfileIcon{...mockUserData}/>
    </View>
  )
}