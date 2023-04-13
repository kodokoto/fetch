import { Text } from 'react-native'
import React from 'react'
import { Box } from 'native-base'

export default function TermsAndConditions() {
  return (
    <Box flex={1} bg="#fff" p={4}>
      <Text className='font-bold'>Privacy policy</Text>
      <Text className='mt-3'>You may consult this list to find the Privacy Policy for each of the advertising partners of Fetch.
      Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are 
      used in their respective advertisements and links that appear on Fetch, which are sent directly to users' 
      browser. They automatically receive your IP address when this occurs. These technologies are used to measure 
      the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see 
      on websites that you visit. Note that Fetch has no access to or control over these cookies that are used by 
      third-party advertisers.</Text>
      <Text className='font-bold mt-8'>Third party privacy policy</Text>
      <Text className='mt-3'>Fetch's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult 
        the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their 
        practices and instructions about how to opt-out of certain options.</Text>
      <Text className='mt-3'>You can choose to disable cookies through your individual browser options. To know more detailed information about 
      cookie management with specific web browsers, it can be found at the browsers' respective websites.</Text>
      <Text className='font-bold mt-8'>Consent</Text>
      <Text className='mt-3'>By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</Text>
    </Box>
  )
}
