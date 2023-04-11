import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Input, ScrollView, TextArea, Slider } from 'native-base'
import { api } from 'app/utils/trpc'
import { useUser } from '@clerk/clerk-expo'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'
import { Ionicons } from '@expo/vector-icons'

import * as Location from 'expo-location';
import { BounceIn } from 'react-native-reanimated'

export default function SitterProfileEdit() {
  const router = useRouter()
  const { sitterId } = useSearchParams()
  

  const mutationSitter = api.sitter.update.useMutation()

  const { data: sitterData, isLoading} = api.sitter.byId.useQuery(String(sitterId), 
    {onSuccess: (data) => {
      setName(data.name)
      setBio(data.bio)
      setLocation(data.location)
      setDescription(data.description)
      setProximityRadius(data.proximityRadius)
    }
  })


  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [proximityRadius, setProximityRadius] = useState(0)

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
    console.log("Name: " + name)
    console.log("Location: " + location)
    console.log("Description: " + description)
    mutationSitter.mutateAsync({
        id : sitterData.id,
        name: name,
        imageUrl: sitterData.imageUrl,
        location: location,
        description: description,
        bio: bio,
        proximityRadius: proximityRadius
    }).then(
      (data) => {
        console.log(data)
        router.replace('/sitter/' + sitterId)
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
                uri: sitterData.imageUrl,
              }}
            />
          </View>
        </View>
        <View className='my-4'>
          <Text className='text-md font-semibold mb-2'>Name: </Text>
          <Input value={name}  onChangeText={setName}/>
        </View>
        
        <View className='my-4'>
          <Text className='text-md font-semibold mb-2'>Location: </Text>
          <Input value={location}  onChangeText={setLocation} InputRightElement={
            <Button className='bg-gray-200 rounded-l-none'>
              <Ionicons name="ios-location-outline" size={18} color="black" onPress={handleLocationSearch}/>
            </Button>
          }/>
        </View>

        <View className='my-4'>
          <Text className='text-md font-semibold mb-2'>Proximity Radius: </Text>
          <Slider 
            value={proximityRadius}
            onChange={setProximityRadius}
            minValue={1}
            maxValue={20}
            step={1}
            className='w-11/12'
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <Text className='text-md font-semibold mb-2'>{proximityRadius} miles</Text>
        </View>

        <View className='my-4'>
          <Text className='text-md font-semibold mb-2'>A short bio: </Text>
          <Input value={bio}  onChangeText={setBio} maxLength={80}/>
        </View>

        <View className='my-4'>
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
                maxLength={200}
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




