import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Input, ScrollView, TextArea, Slider } from 'native-base'
import { api } from 'app/utils/trpc'
import { useUser } from '@clerk/clerk-expo'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'
import { Ionicons } from '@expo/vector-icons'

import * as Location from 'expo-location'
import { BounceIn } from 'react-native-reanimated'
import ProfileForm from 'app/screens/ProfileForm'

export default function SitterProfileEdit() {
  const router = useRouter()
  const { sitterId } = useSearchParams()

  const mutationSitter = api.sitter.update.useMutation()

  const { data: sitterData, isLoading } = api.sitter.byId.useQuery(String(sitterId), {
    onSuccess: (data) => {
      setName(data.name)
      setBio(data.bio)
      setLocation(data.location)
      setDescription(data.description)
      setProximityRadius(data.proximityRadius)
    },
  })

  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [proximityRadius, setProximityRadius] = useState(0)
  const [images, setImages] = useState([])

  const handleLocationSearch = () => {
    Location.getCurrentPositionAsync({}).then((location) => {
      console.log(location)
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
    console.log('Name: ' + name)
    console.log('Location: ' + location)
    console.log('Description: ' + description)
    mutationSitter
      .mutateAsync({
        id: sitterData.id,
        name: name,
        imageUrl: sitterData.imageUrl,
        location: location,
        description: description,
        bio: bio,
        proximityRadius: proximityRadius,
      })
      .then((data) => {
        console.log(data)
        router.replace('/sitter/' + sitterId)
      })
  }

  if (isLoading) return null

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Edit Profile',
        }}
      />
      <ScrollView>
        <View className="m-6">
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
