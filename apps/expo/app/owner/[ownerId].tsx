import { Image, View, Text, Dimensions } from 'react-native'
import { Button, ScrollView } from 'native-base'
import React from 'react'
import { useRouter, useSearchParams, Stack } from 'expo-router'
import { api } from 'app/utils/trpc'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'
import ProfileCarousel from 'app/components/ProfileCarousel'
import ProfileTabs from 'app/components/ProfileTabs'

export default function OwnerProfile() {
  const { ownerId, serviceType, day, timeOfDay } = useSearchParams()
  const router = useRouter()

  const [session, _] = useAtom(sessionAtom)

  const { data: ownerData, error, isLoading } = api.owner.byIdWith.useQuery({
    id: String(ownerId),
    include: ['images', 'reviews', 'pets']
  })


  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>

  return (
    <>
    <Stack.Screen 
      options={ownerData && {
        headerTitle: ownerData.name,
        headerTitleAlign: 'left',
      }}
    />

        <View className='bg-transparent flex-1'>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 flex-col justify-center">
            {/* <ProfileCarousel {...ownerData.images}/> */}
            <View className='bottom-12 flex-1'>
              <View className='flex flex-col gap-1 text-black mx-6 mb-4'>
                  <Image
                      source={{ uri: ownerData.imageUrl }}
                      className='w-16 h-16 rounded-full border-white border-2'
                  />
                  <View className='flex-row justify-between'>
                    <View>
                      <Text></Text>
                      <Text className='text-2xl font-bold'>{ownerData.name}</Text>
                      <Text className='text-sm'>Pet Owner</Text>
                      {/* <Text>{ownerData.bio}</Text> */}
                    </View>
                    {
                      session.currentProfile === Profile.SITTER
                      ? <View className='flex flex-row gap-2'>
                         <Button className='rounded-full'
                            onPress={() => router.replace({
                              pathname: '/messages',
                              params: {
                                receiverId: ownerId,
                                senderId: session.sitterId,
                              }
                            })}
                          >
                            <Text className='text-white'>Message</Text>
                          </Button>
                          <Button className='bg-transparent' onPress={() => {
                            router.push({
                              pathname: '/report',
                              params: {
                                ownerId: ownerData.id,
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
                description: ownerData.description,
                location: ownerData.location,
                reviews: ownerData.reviews,
                pets: ownerData.pets,
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
                ownerId,
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
                ownerId,
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
                ownerId,
                serviceType,
                day,
                timeOfDay,
              }
            })}
          >
            <Text className='text-white'>Report</Text>
          </Button>
        </View>
      : null
    }
    </View>
    </>


  )
}

