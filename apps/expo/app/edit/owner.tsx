import { View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'native-base'
import { api } from 'app/utils/trpc'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import * as Location from 'expo-location'
import ProfileForm from 'app/screens/ProfileForm'

export default function OwnerProfileEdit() {
  const router = useRouter()
  const { ownerId } = useSearchParams()

  const mutationOwner = api.owner.update.useMutation()

  const { data: ownerData, isLoading } = api.owner.byId.useQuery(String(ownerId), {
    onSuccess: (data) => {
      setName(data.name)
      setLocation(data.location)
      setDescription(data.description)
      setBio(data.bio)
    },
  })

  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [images, setImages] = useState([])

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
    mutationOwner
      .mutateAsync({
        id: ownerData.id,
        name: name,
        imageUrl: ownerData.imageUrl,
        location: location,
        description: description,
        bio: bio,
      })
      .then((data) => {
        console.log(data)
        router.replace('/owner/' + ownerId)
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
