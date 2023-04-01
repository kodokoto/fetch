import { Image, View, Text} from 'react-native'
import { Button, Box, NativeBaseProvider } from 'native-base'
import React from 'react'
import SitterProfileLocation from '../components/SitterProfileLocation'
import ProfileRating from '../components/ProfileRating'

export default function ViewProfile() {
  return (
    <NativeBaseProvider>
      <View>
        <Image
          className='w-28 h-28 rounded-full'
          source={require('../assets/pfp.png')} />
        {/* Placeholder components */}
        <Text className="text-orange">Leonard Lungu</Text>
        <Text>Pet Sitter</Text>
        <ProfileRating />
        <SitterProfileLocation />

        <View className='flex-row'>
          <Button className='border-gray-500 border-2 bg-white'>
            <Text className="text-black-500">Book</Text>
          </Button>
          <Button className='border-gray-500 border-2 bg-white'>
            <Text className="text-black-500">Message</Text>
          </Button>
          <Button className='border-gray-500 border-2 bg-white'>
            <Text className="text-red-500">Report</Text>
          </Button>
        </View>

        
      </View>
    </NativeBaseProvider>
  )
}