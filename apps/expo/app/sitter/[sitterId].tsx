import { Image, View, Text, Dimensions } from 'react-native'
import { Button, ScrollView } from 'native-base'
import React, { useState } from 'react'
import { useRouter, useSearchParams, Stack } from 'expo-router'
import { api } from 'app/utils/trpc'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'
import ProfileCarousel from 'app/components/ProfileCarousel'
import ProfileTabs from 'app/components/ProfileTabs'
import ProfileRating from 'app/components/ProfileRating'

export default function SitterProfile() {
  const { sitterId, serviceType, day, timeOfDay, petTypes } = useSearchParams()
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
      let totalOfRatings = 0;

    data.reviews.map(review => {
      totalOfRatings += review.rating;
    })

    let averageRating = (totalOfRatings / data.reviews.length).toFixed(1);
    console.log("Average Rating 2: " + totalOfRatings);
    
    setAverageRating(averageRating);
    }
  })

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [images, setImages] = useState([])
  const [reviews, setReviews] = useState([])
  const [services, setServices] = useState([])
  const [averageRating, setAverageRating] = useState("");


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
                      <Text></Text>
                      <Text className='text-2xl font-bold w-20'>{sitterData && sitterData.name}</Text>
                      <Text className='text-sm'>Pet Sitter</Text>
                      <Text>{sitterData.bio}</Text>
                      <View className="flex-row items-center">
                      <Text>Rating: </Text>
                      <ProfileRating className="mt-auto" rating={averageRating && Number(Number(averageRating).toFixed())} />
                      </View>
                    </View>
                    {
                      session.currentProfile === Profile.OWNER
                      ? <View className='flex flex-row items-start gap-2'>
                         <Button className='rounded-full h-10'
                            onPress={() => router.replace({
                              pathname: '/messages',
                              params: {
                                receiverId: sitterId,
                                senderId: session.ownerId,
                              }
                            })}
                          >
                            <Text className='text-white'>Message</Text>
                          </Button>
                          <Button className='bg-transparent' onPress={() => {
                            router.push({
                              pathname: '/report',
                              params: {
                                sitterId: sitterData.id,
                              }
                            }) 
                          }}>
                        <Text className='text-red-500'>Report</Text>
                      </Button>
                    </View>
                    : null
                    }
                    
                  </View>
              </View> 
              <ProfileTabs {...{
                sitterId: sitterId,
                description: description,
                location: location,
                services: services,
                reviews: reviews,
              }} />
            </View>
      </View>

    </ScrollView>
    {
      serviceType && day && timeOfDay && petTypes && session.currentProfile === Profile.OWNER 
      ? <View className='absolute bottom-0 w-full h-20 bg-transparent'>
          <Button className='fixed bottom-0 rounded-full w-11/12 m-auto mb-8 h-10'
            onPress={() => router.push({
              pathname: '/create/booking',
              params: {
                sitterId,
                serviceType,
                day,
                timeOfDay,
                petTypes,
              }
            })}
          >
            <Text className='text-white'>Request Booking</Text>
          </Button>
          {/* Button for messaging */}
          {/* <Button className='fixed bottom-0 rounded-full w-11/12 m-auto mb-8 h-10'
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
          </Button> */}
          {/* Button for reporting user */}
          {/* <Button className='fixed bottom-0 rounded-full w-11/12 m-auto mb-8 h-10'
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
          </Button> */}
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

