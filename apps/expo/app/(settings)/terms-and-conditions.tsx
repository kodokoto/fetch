import { Text } from 'react-native'
import React from 'react'
import { Box, ScrollView } from 'native-base'

export default function TermsAndConditions() {
  return (
    <Box flex={1} bg="#fff" p={4}>
      <ScrollView>
      <Text className='font-bold'>Welcome to Fetch!</Text>
      <Text>These terms and conditions outline the rules and regulations for the use of Fetch.</Text>
      <Text className='mt-5'>By accessing this application we assume you accept these terms and conditions. Do not continue 
        to use Fetch if you do not agree to take all of the terms and conditions stated on this page.</Text>
      <Text className='mt-3'>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all 
        Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company's terms and 
        conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to
        both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake 
        the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's 
        needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of gb. 
        Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken 
        as interchangeable and therefore as referring to same.</Text>
      <Text className='font-bold mt-8'>License</Text>
      <Text className='mt-3'>Unless otherwise stated, Fetch and/or its licensors own the intellectual property rights for all
         material on Fetch. All intellectual property rights are reserved. You may access this from Fetch for your 
         own personal use subjected to restrictions set in these terms and conditions. You must not:</Text>
      <Text className='mt-3'> + Republish material from Fetch</Text>
      <Text> + Sell, rent or sub-license material from Fetch</Text>
      <Text> + Reproduce, duplicate or copy material from Fetch</Text>
      <Text> + Redistribute content from Fetch</Text>
      <Text className='mt-3'>Parts of this website offer an opportunity for users to post and exchange opinions and information 
        in certain areas of the website. Fetch does not filter, edit, publish or review Comments prior to their 
        presence on the website. Comments do not reflect the views and opinions of Fetch,its agents and/or affiliates. 
        Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted 
        by applicable laws, Fetch shall not be liable for the Comments or for any liability, damages or expenses caused 
        and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</Text> 
      <Text className='mt-3'>Fetch reserves the right to monitor all Comments and to remove any Comments which can be considered 
        inappropriate, offensive or causes breach of these Terms and Conditions.</Text>
      <Text className='font-bold mt-8'>Reservation of rights</Text>
      <Text className='mt-3'>We reserve the right to request that you remove all links or any particular link to our application.
       You approve to immediately remove all links to our application upon request. We also reserve the right to amen these terms 
       and conditions  and it's linking policy at any time. By continuously linking to our application, you agree to be bound to
       and follow these linking terms and conditions.</Text>   
      </ScrollView>
    </Box>
  )
}
