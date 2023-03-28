import { View, Text } from 'react-native'
import React from 'react'
import Filter from '../components/Filter';
import { NativeBaseProvider } from 'native-base';

export default function Home() {
  return (
      <NativeBaseProvider>
        <View>
          <Text className="text-red-500">Test</Text> 
        </View>
        <Filter />
      </NativeBaseProvider>
  )
}