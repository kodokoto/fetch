import { View, Text, Image } from 'react-native'
import React from 'react'
import { Button, Input, ScrollView, Slider, TextArea } from 'native-base'
import { api } from 'app/utils/trpc'
import { useUser } from '@clerk/clerk-expo'
import { Stack, useRouter } from 'expo-router'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'
import { Ionicons } from '@expo/vector-icons'
import * as Location from 'expo-location';

export default function SitterProfileCreate() {
  const router = useRouter()
  const { user, isLoaded } = useUser()
  const mutation = api.sitter.create.useMutation()
  const [session, setSession] = useAtom(sessionAtom)
  const [description, setDescription] = React.useState('')
  const [location, setLocation] = React.useState('')
  const [bio, setBio] = React.useState('')
  const [proximityRadius, setProximityRadius] = React.useState(5)
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
        name: name,
        imageUrl: user.profileImageUrl,
        description: description,
        location: location,
        proximityRadius: proximityRadius,
        bio: bio,
      }).then(
        (sitterProfile) =>{
          setSession({...session, currentProfile: Profile.SITTER, sitterId: sitterProfile.id})
          router.push('/services')
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
                  <View className=' pl-8 flex-row items-center'>
                    <Text className='text-md mr-2'>Next</Text>
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
        <View className='my-4'>
          <Text className='text-md font-semibold mb-2'>We are exited to have you as a pet sitter!</Text>
          <Text className='text-md font-semibold mb-2'>But first, please tell us a little bit about yourself:</Text>
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


          <View className='my-4'>
              <Text className='text-md font-semibold mb-2'>Give us an insight into your experience as a sitter:</Text>
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
        </View>
      </View>   

      </ScrollView>
    
    </>
  )
}
