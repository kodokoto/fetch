import { Image, View, Text, Dimensions } from 'react-native'
import { Button, ScrollView } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { useRouter, useSearchParams, Stack } from 'expo-router'
import { api } from 'app/utils/trpc'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'
import ProfileCarousel from 'app/components/ProfileCarousel'
import ProfileTabs from 'app/components/ProfileTabs'
import * as ImagePicker from 'expo-image-picker';

export default function SitterProfile() {
  const { sitterId, serviceType, day, timeOfDay } = useSearchParams()
  const router = useRouter()

  const [session, _] = useAtom(sessionAtom)

  const { data: sitterData, error, isLoading } = api.sitter.byIdWith.useQuery({
    id: String(sitterId),
    include: ['images', 'reviews', 'services']
  })

  const mutation = api.image.create.useMutation()

  const selectPhotoTapped = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true
      });
      
      cloudinaryUpload(result.assets[0].uri, result.assets[0].base64);
    // launchCamera(options, (response) => {

    //   console.log('Response = ', response);
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else {
    //     const uri = response.uri;
    //     const type = response.type;
    //     const name = response.fileName;
    //     const source = {
    //       uri,
    //       type,
    //       name,
    //     }
    //     console.log("Source: " + source);
    //   }
    // });
  }

  const cloudinaryUpload = (photo, base64Data) => {
    const data = new FormData()
    const uriArr = photo.split(".");
    const fileType = uriArr[uriArr.length - 1];
    const file = `data:${fileType};base64,${base64Data}`
    data.append('file', file)
    data.append('upload_preset', 'ml_default')
    data.append("cloud_name", "dfuiyl9sr")
    fetch("https://api.cloudinary.com/v1_1/dfuiyl9sr/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(data => {
        console.log(data.url)
        mutation.mutate({
            sitterId: session.sitterId,
            url: data.url
        })
      }).catch(err => {
        console.log("An Error Occured While Uploading")
      })
  }


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
            <ProfileCarousel sitterId={sitterId} images={sitterData.images}/>
            <View className='bottom-12 flex-1'>
              <View className='flex flex-col gap-1 text-black mx-6 mb-4'>
                  <Image
                      source={{ uri: sitterData.imageUrl }}
                      className='w-16 h-16 rounded-full border-white border-2'
                  />
                  <View className='flex-row justify-between'>
                    <View>
                      <Text className='text-2xl font-bold'>{sitterData.name}</Text>
                      <Text>{sitterData.bio}</Text>
                    </View>
                    {
                      session.currentProfile === Profile.OWNER
                      ? <View className='flex flex-row gap-2'>
                         <Button className='rounded-full'
                            onPress={() => router.replace({
                              pathname: '/messages',
                              params: {
                                receiverId: session.ownerId,
                                senderId: sitterId,
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
                description: sitterData.description,
                location: sitterData.location,
                reviews: sitterData.reviews,
                services: sitterData.services,
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
        </View>
      : null
    }
    </View>
    </>


  )
}

