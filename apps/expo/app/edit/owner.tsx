import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Input, ScrollView, TextArea } from 'native-base'
import { api } from 'app/utils/trpc'
import { useUser } from '@clerk/clerk-expo'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'
import { Ionicons } from '@expo/vector-icons'

import * as Location from 'expo-location';
import { BounceIn } from 'react-native-reanimated'

export default function OwnerProfileEdit() {
  const router = useRouter()
  const { ownerId } = useSearchParams()
  

  const mutationOwner = api.owner.update.useMutation()

  const { data: ownerData, isLoading} = api.owner.byId.useQuery(String(ownerId), 
    {onSuccess: (data) => {
      setName(data.name)
      setLocation(data.location)
      setDescription(data.description)
      setBio(data.bio)
    }
  })


  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')

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

  const handleProfileEditing = () => {
    mutationOwner.mutateAsync({
        id : ownerData.id,
        name: name,
        imageUrl: ownerData.imageUrl,
        location: location,
        description: description,
        bio: bio
    }).then(
      (data) => {
        console.log(data)
        router.replace('/owner/' + ownerId)
      }
    )
  }

  if (isLoading) return null

  return (

    <>
      <ScrollView>
        <View className='m-6'>
        <View className='my-8 flex-row justify-between'>
          <View className='ml-2'>
            <Text className='text-3xl font-bold'>Edit your details</Text>
          </View>
          <View className=' flex-col justify-center'>
            <Image
              className='rounded-full w-12 h-12 mr-4'  
              source={{
                uri: ownerData.imageUrl,
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

        <View className='my-4'>
          <Text className='text-md font-semibold mb-2'>A short bio: </Text>
          <Input value={bio}  onChangeText={setBio} maxLength={80}/>
        </View>

        <View className='my-8'>
          <Text className='text-md font-semibold mb-2'>About you:</Text>
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
        <View className='my-8'>
            <Button className='fixed bottom-0 rounded-full w-11/12 m-auto mb-8 h-10' 
                onPress={handleProfileEditing}
            >
                <Text className='text-white'>Submit</Text>
            </Button>
        </View>
        </View>

      </ScrollView>
    </>

    )
  }




