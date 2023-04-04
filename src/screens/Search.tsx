import { View, Text } from 'react-native'
import { Button } from 'native-base'
import { useNavigation } from '@react-navigation/native';


import React from 'react'
import Filter from '../components/Filter'

export default function Search() {
  const navigation = useNavigation();  
  return (
    <View className="h-96">
      <Filter />
      <Text className="text-orange-500">Test</Text>
      {/* THIS IS A PLACEHOLDER FOR THE SEARCH RESULTS, PRESS ON THOSE MOFOS AND IT REDIRECTS YOU TO ViewProfielSitter.tsx */}
      <Button
        onPress={() => navigation.navigate('ViewProfileSitter')}
      >
        <Text>Leonard Lungu</Text>
      </Button>
    </View>
  )
}
