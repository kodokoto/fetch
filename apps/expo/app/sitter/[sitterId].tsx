import { Image, View, Text, Dimensions, TouchableOpacity, Animated } from 'react-native'
import { Button, Box, NativeBaseProvider, ScrollView, Center } from 'native-base'
import React from 'react'
import SitterProfileLocation from 'app/components/SitterProfileLocation'
import ProfileRating from 'app/components/ProfileRating'
import SitterProfileNextAvailable from 'app/components/SitterProfileNextAvaliable'
import { Link, useRouter, useSearchParams } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import { api } from 'app/utils/trpc'
import Carousel from 'react-native-reanimated-carousel';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'

export default function SitterProfile() {
  const { sitterId } = useSearchParams()
  const router = useRouter()

  const [session, setSession] = useAtom(sessionAtom)

  const { data: sitterData, error, isLoading } = api.sitter.byIdWithImages.useQuery(Number(sitterId))

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'info', title: 'Info' },
    { key: 'reviews', title: 'Reviews' },
    { key: 'services', title: 'Services' },
    { key: 'preferences', title: 'Preferences'},
  ]);


  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>
  const width = Dimensions.get('window').width;

  const mockImageUrls = [
    // images of cats
    'https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*',
    'https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*',
    'https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*',
    'https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*',
    'https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*',
  ]

  const Info = () => (
    <View className='flex flex-1 flex-col gap-8 mx-4 my-0'
      style={{flex: 1}}
    >
        <View>
          <Text className='text-xl font-bold mb-2'>About</Text>
          <Text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat illum ratione ab fugiat minus ea quod consequatur officia odio minima natus amet, adipisci porro expedita odit blanditiis esse, facere aliquam!
          </Text>
        </View>
        <View>
          <Text className='text-xl font-bold mb-2'>Location</Text>
          <Text>
            Here hoes the map
          </Text>
        </View>
    </View>
  );

  const Reviews = () => (
    <View className='flex justify-center items-center mt-8'>
        <Text>No reviews yet</Text>
    </View>
  );

  const Services = () => (
    <View className='flex justify-center items-center mt-8'>
        <Text>No Services</Text>
    </View>
  );

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View className='flex flex-row items-center justify-center'>
        {props.navigationState.routes.map((route, i) => {
          
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          const borderColor = index === i ? 'black' : 'transparent';
          return (
            <TouchableOpacity
              className='align-center justify-center w-1/3 items-center h-12 transition-all'
              style={{ borderColor, borderBottomWidth: 2 }}
              onPress={() => setIndex(i)}>
              <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View className='bg-transparent flex-1'>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 flex-col justify-center">
            <Carousel
                loop
                width={width}
                height={width/ 1.5}
                autoPlay={false}
                data={mockImageUrls}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index, item }) => ( 
                  // sitterData.images.length > 0 ?
                  <Image source={{ uri: item }} style={{ width: width, height: width / 1.5 }} /> 
                  // : <View className='flex justify-center items-center w-full h-full'> <Text>No images</Text> </View>
                )}
            />
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
                  {/* <Text>{sitterData.location}</Text> */}
                  {/* <Text>{sitterData.rating}</Text> */}
              </View> 
              <ProfileTabs />
            </View>
      </View>

    </ScrollView>
    {
      session.currentProfile === Profile.OWNER 
      ? <View className='absolute bottom-0 w-full h-20 bg-transparent'>
          <Button className='fixed bottom-0 rounded-full w-11/12 m-auto mb-8 h-10'
            onPress={() => router.push({
              pathname: '/booking/create',
              params: {

              }
            })}
          >
            <Text className='text-white'>Request Booking</Text>
          </Button>
        </View>
      : null
    }
    
    </View>

    
  )
}

function ProfileTabs() {

  const Info = () => (
    <View className='flex flex-1 flex-col gap-8 mx-4 my-0'
      style={{flex: 1}}
    >
        <View>
          <Text className='text-xl font-bold mb-2'>About</Text>
          <Text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat illum ratione ab fugiat minus ea quod consequatur officia odio minima natus amet, adipisci porro expedita odit blanditiis esse, facere aliquam!
          </Text>
        </View>
        <View>
          <Text className='text-xl font-bold mb-2'>Location</Text>
          <Text>
            Here hoes the map
          </Text>
        </View>
    </View>
  );



  const Reviews = () => (
    <View className='flex justify-center items-center mt-8'>
        <Text>No reviews yet</Text>
    </View>
  );

  const Services = () => (
    <View className='flex justify-center items-center mt-8'>
        <Text>No Services</Text>
    </View>
  );


  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'info', title: 'Info' },
    { key: 'reviews', title: 'Reviews' },
    { key: 'services', title: 'Services' },
  ]);

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View className='flex flex-row items-center justify-center'>
        {props.navigationState.routes.map((route, i) => {
          
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          const borderColor = index === i ? 'black' : 'transparent';
          return (
            <TouchableOpacity
              className='align-center justify-center w-1/3 items-center h-12 transition-all'
              style={{ borderColor, borderBottomWidth: 2 }}
              onPress={() => setIndex(i)}>
              <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const width = Dimensions.get('window').width;

  return (
    <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
            info: Info,
            reviews: Reviews,
            services: Services
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: width }}
        renderTabBar={renderTabBar}
        
    />
  )

}
