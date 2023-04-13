import { View, Text } from 'react-native'
import React from 'react'
import { Box, Center } from 'native-base'

export default function FAQ() {
  return (
    <View>
      <Box className='mx-3'>
        <Center>
          <Text className='font-bold text-xl'>
            This is the FAQ page.
          </Text>
        </Center>
        <Text className='font-bold mt-8'>
          What is Fetch?
        </Text>
        <Text className='mt-3'>
          Fetch is an app which allows you to find pet sitters and dog walkers in your area. You can also find pet sitters and dog walkers in other areas if you are planning a trip.
        </Text>
        <Text className='font-bold mt-8'>
          How do I use Fetch?
        </Text>
        <Text className='mt-3'>
          You are already using it!
        </Text>
        <Text className='font-bold mt-8'>
          How do I find a pet sitter or dog walker?
        </Text>
        <Text className='mt-3'>
          You can find a pet sitter or dog walker by searching for them in the search bar. You can also find pet sitters and dog walkers by searching for them in the search bar.
        </Text>
        <Text className='font-bold mt-8'>
          How do I find a pet sitter or dog walker in my area?
        </Text>
        <Text className='mt-3'>
          You can find a pet sitter or dog walker in your area by searching for them in the search bar. You can also find pet sitters and dog walkers in your area by searching for them in the search bar.
        </Text>
      </Box>
    </View>
  )
}
