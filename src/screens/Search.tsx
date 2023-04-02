import { View, Text } from 'react-native'
import { Button, NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react'

export default function Chat() {

  return (
    <NativeBaseProvider>
      <View>
        <Text className="text-orange-500">Test</Text>
        {/* THIS IS A PLACEHOLDER FOR THE SEARCH RESULTS, PRESS ON THOSE MOFOS AND IT REDIRECTS YOU TO ViewProfielSitter.tsx */}
        <Button
          onPress={() => navigation.navigate('ViewProfileSitter.tsx')}
        >
          <Text>Leonard Lungu</Text>
        </Button>
      </View>
    </NativeBaseProvider>

  )
}
