import { View, Linking } from 'react-native'
import { Button } from 'native-base'
import React from 'react'
import { useRouter } from 'expo-router'
import { Box } from 'native-base'

export default function SettingsMenu() {
  const router = useRouter()
  const phoneNumber = '020FETCHAPP'; 
  const email = 'contact@fetch.co.uk';

  const handleCallUsPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const handleEmailUsPress = () => {
    Linking.openURL(`mailto:${email}`);
  };


  return (
    <View className='m-6'>
      <Box bg="#fff" p={4} rounded="lg" shadow={1} className="w-11/12 mx-auto">
        <View >
          <Button className='bg-blue-500 mb-8 rounded-full w-10/12 mx-auto'  onPress={() => router.push('about')}>
            About Us
          </Button>
        </View>
        <View>
          <Button className='bg-blue-500 mb-8 rounded-full w-10/12 mx-auto' onPress={() => router.push('terms-and-conditions')} >
            Terms and Conditions
          </Button>
        </View>
        <View>
          <Button className='bg-blue-500 mb-8 rounded-full w-10/12 mx-auto'  onPress={() => router.push('privacy-policy')} >
            Privacy Policy
          </Button>
        </View>
        <View>
          <Button className='bg-blue-500 mb-8 rounded-full w-10/12 mx-auto' onPress={handleCallUsPress} >
            Call Us
          </Button>
        </View>
        <View>
          <Button className='bg-blue-500 mb-8 rounded-full w-10/12 mx-auto'  onPress={handleEmailUsPress} >
            Email Us
          </Button>
        </View>
        <View>
          <Button className='bg-blue-500 mb-8 rounded-full w-10/12 mx-auto' onPress={() => router.push('faq')} >
            FAQ 
          </Button>
        </View>
      </Box>
    </View>
  )
}

