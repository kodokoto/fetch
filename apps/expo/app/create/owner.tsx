import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Input, ScrollView, TextArea } from 'native-base'
import { api } from 'app/utils/trpc'
import { useUser } from '@clerk/clerk-expo'
import { Stack, useRouter } from 'expo-router'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'
import { Ionicons } from '@expo/vector-icons'

import * as Location from 'expo-location';

export default function OwnerProfileCreate() {

  const [location, setLocation] = useState('');

  const router = useRouter()
  const { user, isLoaded } = useUser()
  const mutation = api.owner.create.useMutation()
  const [session, setSession] = useAtom(sessionAtom)
  const [description, setDescription] = React.useState('')
  const [name, setName] = React.useState(user.firstName)
  
  const handleLocationSearch = () => {
    Location.getCurrentPositionAsync({}).then(
      (location) => {
        console.log(location)
        location
        ? fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyDZhIqcrDLSsyQQYeMFSYDqQN6doi3bW34`)
          .then((response) => response.json())
          .then((data) => { 
            data.results
            ? setLocation(data.results[0].formatted_address)
            : console.log(data)
          })
        : console.log('Location not found')
      }
    )
  }  

  const handleProfileCreation = () => {
    if (user && user.firstName) {
      mutation.mutateAsync({
        userId: user.id,
        name: user.firstName,
        imageUrl: user.profileImageUrl,
        description: description,
        location: location,
      }).then(
        (ownerProfile) =>{
          setSession({...session, currentProfile: Profile.OWNER, ownerId: ownerProfile.id})
          router.replace('/pets')
        } 
      )  
    } else {
      console.log('User not found')
    }
  }

  if (!isLoaded) return null

  return (

    <>
      <Stack.Screen 
        options={{
          headerTitle: 'Create Profile',
          headerRight(props) {
            return (
              location.length > 0
              ? (
                <Button className='bg-transparent' onPress={()=> handleProfileCreation()}>
                  <View className='flex-row items-center'>
                    <Text className='mr-2'>Next</Text>
                    <Ionicons name="ios-arrow-forward-circle-outline" size={24} color="black" />
                  </View>
                </Button>
              )
              : null
            )
          },
        }}
      />
      <ScrollView>
        <View className='m-6'>
        <View className='my-8 flex-row justify-between'>
          <View className='ml-2'>
            <Text className='text-3xl font-bold'>Hi {user.firstName}!</Text>
            <Text className=''>Welcome to fetch.</Text>
          </View>
          <View className=' flex-col justify-center'>
            <Image
              className='rounded-full w-12 h-12 mr-4'  
              source={{
                uri: user.profileImageUrl,
              }}
            />
          </View>
        </View>
        <View className='my-8'>
          <Text className='text-md font-semibold mb-2'>Name: </Text>
          <Input value={name}  onChangeText={setName}/>
        </View>
        
        <View className='my-8'>
          <Text className='text-md font-semibold mb-2'>Location: </Text>
          <Input value={location}  onChangeText={setLocation} InputRightElement={
            <Button className='bg-gray-200 rounded-l-none'>
              <Ionicons name="ios-location-outline" size={18} color="black" onPress={handleLocationSearch}/>
            </Button>
          }/>
        </View>

        <View className='my-8'>
          <Text className='text-md font-semibold mb-2'>Tell us a little bit about yourself:</Text>
          <TextArea 
              h={20} 
              placeholder="Text Area Placeholder" 
              value={description}
              w="100%" 
              autoCompleteType={undefined} 
              onChangeText={
                  (text) => setDescription(text) 
              }
          />
        </View>
      </View>

      </ScrollView>
    </>

  )
}

