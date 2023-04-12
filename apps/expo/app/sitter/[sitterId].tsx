import { Image, View, Text, Dimensions, Pressable } from 'react-native'
import { Button, ScrollView, Menu } from 'native-base'
import React, { useState } from 'react'
import { useRouter, useSearchParams, Stack } from 'expo-router'
import { api } from 'app/utils/trpc'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'
import ProfileCarousel from 'app/components/ProfileCarousel'
import ProfileTabs from 'app/components/ProfileTabs'
import { Entypo, Feather } from '@expo/vector-icons'

export default function SitterProfile() {
  const { sitterId, serviceType, day, timeOfDay } = useSearchParams()
  const router = useRouter()

  const [session, _] = useAtom(sessionAtom)

  const { data: sitterData, error, isLoading } = api.sitter.byIdWith.useQuery({
    id: String(sitterId),
    include: ['images', 'reviews', 'services']
  }, {
    cacheTime: 0,
    onSuccess: (data) => {
      console.log("data: ", data)
      setName(data.name)
      setLocation(data.location)
      setDescription(data.description)
      setImageUrl(data.imageUrl)
      setImages(data.images)
      setReviews(data.reviews)
      setServices(data.services)
    }
  })

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [images, setImages] = useState([])
  const [reviews, setReviews] = useState([])
  const [services, setServices] = useState([])


  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>
  return (
    <>
    <Stack.Screen 
      options={sitterData && {
        headerTitle: sitterData.name,
        headerTitleAlign: 'left',
      }}
    />

        <View className='bg-transparent flex-1'>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 flex-col justify-center">
            <ProfileCarousel images={sitterData.images}/>
            <View className='bottom-12 flex-1'>
              <View className='flex flex-col gap-1 text-black mx-6 mb-4'>
                  <Image
                      source={{ uri: sitterData.imageUrl }}
                      className='w-16 h-16 rounded-full border-white border-2'
                  />
                  <View className='flex-row justify-between'>
                    <View>
                      <Text className='text-2xl font-bold'>{sitterData.name}</Text>
                      <Text className='text-sm'>Pet Sitter</Text>
                      <Text>{sitterData.bio}</Text>
                    </View>
                    {
                      session.currentProfile === Profile.OWNER
                      ? <View className='flex flex-row'>
                         <Button className='rounded-full'
                            onPress={() => router.replace({
                              pathname: '/messages',
                              params: {
                                receiverId: sitterId,
                                senderId: session.ownerId,
                              }
                            })}
                          >
                            <Feather name="message-circle" size={24} color="#3b82f6" />                            </Button>
                          <Menu 
                            trigger={(triggerProps) => {
                              return <Pressable {...triggerProps} className='bg-red-500'>
                                        <Entypo name="dots-three-vertical" size={24} color="black" />
                                      </Pressable>
                            }
                          }>
                            <Menu.Item className='rounded-full'>
                              <Text>Report</Text>
                            </Menu.Item>
                          </Menu>
                    </View>
                    : null
                    }
                    
                  </View>
              </View> 
              <ProfileTabs {...{
                description: description,
                location: location,
                services: services,
                reviews: reviews,
              }} />
            </View>
      </View>

    </ScrollView>
    {
      serviceType && day && timeOfDay && session.currentProfile === Profile.OWNER 
      ? <View className='absolute bottom-0 w-full h-20 bg-transparent'>
          <Button className='fixed bottom-0 rounded-full w-11/12 m-auto mb-8 h-10'
            onPress={() => router.push({
              pathname: '/create/booking',
              params: {
                sitterId,
                serviceType,
                day,
                timeOfDay,
              }
            })}
          >
            <Text className='text-white'>Request Booking</Text>
          </Button>
          {/* Button for messaging */}
          <Button className='fixed bottom-0 rounded-full w-11/12 m-auto mb-8 h-10'
            onPress={() => router.push({
              pathname: '/create/booking',
              params: {
                sitterId,
                serviceType,
                day,
                timeOfDay,
              }
            })}
          >
            <Text className='text-white'>Message</Text>
          </Button>
          {/* Button for reporting user */}
          <Button className='fixed bottom-0 rounded-full w-11/12 m-auto mb-8 h-10'
            onPress={() => router.push({
              pathname: '/create/booking',
              params: {
                sitterId,
                serviceType,
                day,
                timeOfDay,
              }
            })}
          >
            <Text className='text-white'>Report</Text>
          </Button>
        </View>
      : <View className='absolute bottom-0 w-full h-20 bg-transparent'>
          <Button className='fixed bottom-0 rounded-full w-11/12 m-auto mb-8 h-10'
              onPress={() => router.push({
              pathname: '/edit/sitter',
              params: {
                  sitterId
              }
              })}
          >
              <Text className='text-white'>Edit Profile</Text>
          </Button>
      </View>
    }
    </View>
    </>


  )
}

