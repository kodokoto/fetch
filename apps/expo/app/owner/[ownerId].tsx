import { Image, View, Text } from 'react-native'
import { Button, ScrollView } from 'native-base'

import React, { useState } from 'react'
import { useRouter, useSearchParams, Stack } from 'expo-router'
import { api } from 'app/utils/trpc'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'
import ProfileCarousel from 'app/components/ProfileCarousel'
import ProfileTabs from 'app/components/ProfileTabs'
import { Feather } from '@expo/vector-icons'

export default function OwnerProfile() {
  const { ownerId } = useSearchParams()
  const router = useRouter()

  const [session, _] = useAtom(sessionAtom)

  const {
    data: ownerData,
    error,
    isLoading,
  } = api.owner.byIdWith.useQuery(
    {
      id: String(ownerId),
      include: ['images', 'reviews', 'pets'],
    },
    {
      enabled: !!ownerId,
      cacheTime: 0,
      onSuccess: (data) => {
        setName(data.name)
        setLocation(data.location)
        setDescription(data.description)
        setImageUrl(data.imageUrl)
        setImages(data.images)
        setReviews(data.reviews)
        setPets(data.pets)
      },
    }
  )

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [images, setImages] = useState([])
  const [reviews, setReviews] = useState([])
  const [pets, setPets] = useState([])

  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>

  return (
    <>
      <Stack.Screen
        options={
          ownerData && {
            headerTitle: name,
            headerTitleAlign: 'left',
          }
        }
      />

      <View className="bg-transparent flex-grow">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 flex-col justify-center ">
            <ProfileCarousel images={ownerData.images} />
            <View className="bottom-12 flex-col flex-grow ">
              <View className="flex flex-col gap-1 text-black mx-6 mb-4">
                <Image source={{ uri: imageUrl }} className="w-16 h-16 rounded-full border-white border-2" />
                <View className="flex-row justify-between">
                  <View>
                    <Text></Text>
                    <Text className="text-2xl font-bold">{name}</Text>
                    <Text className="text-sm">Pet Owner</Text>
                    <Text>{ownerData.bio}</Text>
                  </View>
                  {session.currentProfile === Profile.SITTER ? (
                    <View className="flex flex-row justify-between items-center">
                      <Button
                        className="rounded-full w-12 h-12 bg-gray-100 shadow-sm mr-10"
                        onPress={() =>
                          router.replace({
                            pathname: '/messages',
                            params: {
                              receiverId: ownerId,
                              senderId: session.sitterId,
                            },
                          })
                        }
                      >
                        <View>
                          <Feather name="message-circle" size={24} color="#3b82f6" />
                        </View>
                      </Button>
                    </View>
                  ) : null}
                </View>
              </View>
              <View className="flex-1 h-fit">
                <ProfileTabs
                  {...{
                    description: description,
                    location: location,
                    reviews: reviews,
                    pets: pets,
                  }}
                />
                <View className="h-18"></View>
              </View>
            </View>
          </View>
        </ScrollView>
        {session.currentProfile === Profile.OWNER ? (
          <View className="absolute bottom-0 w-full h-20 bg-transparent">
            <Button
              className="fixed bottom-0 rounded-full bg-blue-500 w-11/12 m-auto mb-8 h-10"
              onPress={() =>
                router.push({
                  pathname: '/edit/owner',
                  params: {
                    ownerId,
                  },
                })
              }
            >
              <Text className="text-white text-bold">Edit Profile</Text>
            </Button>
          </View>
        ) : null}
      </View>
    </>
  )
}
