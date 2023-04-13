import { Text } from 'react-native'
import { Box } from 'native-base'
import React from 'react'

export default function AboutUs() {
  return (
      <Box flex={1} bg="#fff" p={4}>
        <Text className='font-bold text-xl'>About Fetch</Text>
        <Text className='mt-8'>
         Welcome to Fetch! Home for pet owners and pet sitters, we hope you have a great time here!
         If you require any more information or have any questions about our site, please feel free to 
         contact us by email or by phone through the settings page where we have dedicated buttons for those!.
        </Text>
        <Text className='mt-3'>Here at Fetch we take customer advice very seriously</Text>
      </Box>
  )
}
