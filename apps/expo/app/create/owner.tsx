import { View, Text, Image } from 'react-native'
import React from 'react'
import {  ScrollView } from 'native-base'
import { api } from 'app/utils/trpc'
import { useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'

import * as Location from 'expo-location'
import ProfileForm from 'app/screens/ProfileForm'

export default function OwnerProfileCreate() {
  const router = useRouter()
  const { user, isLoaded } = useUser()
  const mutation = api.owner.create.useMutation()
  const [session, setSession] = useAtom(sessionAtom)
  const [description, setDescription] = React.useState('I dont have a description yet.')
  const [location, setLocation] = React.useState('')
  const [bio, setBio] = React.useState("Hello! I'm a new pet owner.")
  const [name, setName] = React.useState(user.firstName)
  const [images, setImages] = React.useState([])

  const handleLocationSearch = () => {
    Location.getCurrentPositionAsync({}).then((location) => {
      location
        ? fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyDZhIqcrDLSsyQQYeMFSYDqQN6doi3bW34`
          )
            .then((response) => response.json())
            .then((data) => {
              data.results ? setLocation(data.results[0].formatted_address) : console.log(data)
            })
        : console.log('Location not found')
    })
  }

  const handleSubmit = () => {
    if (user && user.firstName) {
      mutation
        .mutateAsync({
          userId: user.id,
          name: user.firstName,
          imageUrl: user.profileImageUrl,
          description: description,
          location: location,
          bio: bio,
          images: images,
        })
        .then((ownerProfile) => {
          setSession({ ...session, currentProfile: Profile.OWNER, ownerId: ownerProfile.id })
          router.replace('/pets')
        })
    } else {
      console.log('User not found')
    }
  }

  if (!isLoaded) return null

  return (
    <>
      <ScrollView>
        <View className="m-6 mt-0">
          <View className="my-8 flex-row justify-between">
            <View className="ml-2">
              <Text className="text-3xl font-bold">Hi {user.firstName}!</Text>
              <Text className="">
                Welcome to <Text className="font-[Vulf-mono]">fetch</Text>
              </Text>
            </View>
            <View className=" flex-col justify-center">
              <Image
                className="rounded-full w-12 h-12 mr-4"
                source={{
                  uri: user.profileImageUrl,
                }}
              />
            </View>
          </View>
          <ProfileForm
            {...{
              description,
              setDescription,
              name,
              setName,
              location,
              setLocation,
              bio,
              setBio,
              images,
              setImages,
              handleLocationSearch,
              handleSubmit,
            }}
          />
        </View>
      </ScrollView>
    </>
  )
}
