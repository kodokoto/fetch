import { Box, Text } from 'native-base'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

type User = {
  name: string,
}

export default function WelcomeMessage(props: User) {
  return (
    <Box className="items-start ml-5 mt-10 mb-6 border border-transparent border-solid rounded-md w-56 h-16">
      <Text className="font-bold text-lg">Hello</Text>
      <Text className="font-bold text-2xl">
        {props.name}
        <Ionicons size={30} color='#4c8ab9' className='ml-2' name="hand-left-outline"></Ionicons>
      </Text>
    </Box>
  )
}
