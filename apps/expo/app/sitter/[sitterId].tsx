import { Image, View, Text, Dimensions, TouchableOpacity, Animated } from 'react-native'
import { Button, Box, NativeBaseProvider, ScrollView } from 'native-base'
import React from 'react'
import SitterProfileLocation from 'app/components/SitterProfileLocation'
import ProfileRating from 'app/components/ProfileRating'
import SitterProfileNextAvailable from 'app/components/SitterProfileNextAvaliable'
import { useRouter, useSearchParams } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import { api } from 'app/utils/trpc'
import Carousel from 'react-native-reanimated-carousel';
import { TabView, SceneMap } from 'react-native-tab-view';

export default function SitterProfile() {
  const { sitterId } = useSearchParams()
  const router = useRouter()

  const { data: sitterData, error, isLoading } = api.sitter.byId.useQuery(Number(sitterId))

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'info', title: 'Info' },
    { key: 'reviews', title: 'Reviews' },
    { key: 'services', title: 'Services' },
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
    <View className='flex flex-col gap-8 m-6'>
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

          console.log(props.navigationState)

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
    <ScrollView>
      <View className="flex flex-col justify-center">
            <Carousel
                loop
                width={width}
                height={width/ 1.5}
                autoPlay={false}
                data={mockImageUrls}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index, item }) => (
                    <View
                        
                    >
                        <Image
                            source={{ uri: item }}
                            style={{ width: width, height: width / 1.5 }}
                        />
                        {/* <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {item}
                        </Text> */}
                    </View>

                )}
            />
            <View className='bottom-12'>
              <View className='flex flex-col gap-1 text-black mx-6 mb-4'>
                  <Image
                      source={{ uri: sitterData.imageUrl }}
                      className='w-16 h-16 rounded-full border-white border-2'
                  />
                  <Text className='text-2xl font-bold'>{sitterData.name}</Text>
                  <Text>Hello, this is my bio</Text>
                  <Text>Here is where the reviews would go</Text>
                  <Text>Here is where the location would go</Text>
              </View> 
              {/* <View className='flex flex-row h-auto justify-center '> */}
              <TabView
                  className='h-screen'
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

            </View>
            {/* </View> */}
            {/* <Text className='text-2xl font-bold'>Reviews</Text> */}
    {/*     

        <SitterProfileNextAvailable {...mockSitter} /> */}
      </View>

    </ScrollView>
  )
}
