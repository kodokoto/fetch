import { View, Text, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Button, ScrollView } from 'native-base'
import { api } from 'app/utils/trpc'
import { useUser } from '@clerk/clerk-expo'
import { Stack, useRouter } from 'expo-router'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'
import { Ionicons } from '@expo/vector-icons'
import * as Location from 'expo-location';
import ProfileForm from 'app/screens/ProfileForm'

export default function SitterProfileCreate() {
  const router = useRouter()
  const { user, isLoaded } = useUser()
  const mutation = api.sitter.create.useMutation({
    onSuccess: (sitterProfile) => {
      setSession({...session, currentProfile: Profile.SITTER, sitterId: sitterProfile.id})
      router.replace('/services')
    }
  })

  const [session, setSession] = useAtom(sessionAtom)
  const [description, setDescription] = React.useState('I dont have a description yet.')
  const [location, setLocation] = React.useState('')
  const [bio, setBio] = React.useState('Hello! I\'m a new sitter.')
  const [proximityRadius, setProximityRadius] = React.useState(5)
  const [name, setName] = React.useState(user.firstName)
  const [images, setImages] = React.useState([])
  const [submitPressed, setSubmitPressed] = useState(false);

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
  const handleSubmit = () => {
    if (user && user.firstName) { 
      mutation.mutateAsync({
        userId: user.id,
        name: name,
        imageUrl: user.profileImageUrl,
        bio: bio,
        description: description,
        location: location,
        proximityRadius: proximityRadius,
        images: images,
      })
    } else {
      console.log('User not found')
    }
  }
  useEffect(() => {


    if(submitPressed && images.length > 0){
      handleSubmit();
    }
  }, [images, submitPressed])

  if (!isLoaded) return null

  return (
    <>
      <ScrollView>
        <View className='m-6'>
        <View className='my-8 mx-2 flex-row justify-between'>
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
        <View className='my-4 mx-4'>
          <Text className='text-md font-semibold mb-2'>We are exited to have you as a pet sitter!</Text>
          <Text className='text-md font-semibold mb-2'>But first, please tell us a little bit about yourself:</Text>
        </View>
       <ProfileForm {
          ...{
            name,
            setName,
            bio,
            setBio,
            description,
            setDescription,
            location,
            setLocation,
            images,
            setImages,
            proximityRadius,
            setProximityRadius,
            handleLocationSearch,
            handleSubmit
          }
       }/>
      </View>   
      </ScrollView>
    
    </>
  )
}
