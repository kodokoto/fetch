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
    <View>
      <Box bg="#fff" p={4} rounded="lg" shadow={1} className="w-11/12 mx-auto">
        <View >
          <Button style={{marginBottom: 30}} onPress={() => router.push('about')}>
            About Us
          </Button>
        </View>
        <View style={{ marginBottom: 30 }}>
          <Button title="Terms and Conditions" onPress={() => router.push('terms-and-conditions')} >
            Terms and Conditions
          </Button>
        </View>
        <View style={{ marginBottom: 30 }}>
          <Button title="Privacy Policy" onPress={() => router.push('privacy-policy')} >
            Privacy Policy
          </Button>
        </View>
        <View style={{ marginBottom: 30 }}>
          <Button title="Call Us" onPress={handleCallUsPress} >
            Call Us
          </Button>
        </View>
        <View style={{ marginBottom: 30 }}>
          <Button title="Email Us" onPress={handleEmailUsPress} >
            Email Us
          </Button>
        </View>
        <View style={{ marginBottom: 30 }}>
          <Button title="FAQ" onPress={() => router.push('faq')} >
            FAQ 
          </Button>
        </View>
      </Box>
    </View>
  )
}

