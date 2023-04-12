import * as React from 'react';
import { Animated, View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Button } from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Pet, Review, Service } from '@prisma/client';
import { useRouter } from "expo-router";
import ServiceDescription from './ServiceDescription';
import ReviewDescription from './ReviewDescription';
import DisplayCardList from './DisplayCardList';
import PetDisplayCard from './PetDisplayCard';
import ServiceDisplayCard from './ServiceDisplayCard';
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'

type ProfileTabProps = {
    sitterId: string | string[];
    description: string;
    location: string;
    reviews?: Review[];
    services?: Service[];
    pets?: Pet[];
}

export default function ProfileTabs(props: ProfileTabProps) {
    const router = useRouter();
    const [session, _] = useAtom(sessionAtom)
    

    //TODO: turn all these into scrollable views
    const Info = () => (
      <View className='flex flex-1 flex-col gap-8 mx-4 my-0'
        style={{flex: 1}}
      >
          <View>
            <Text className='text-xl font-bold mb-2'>About</Text>
            <Text>
                {props.description}
            </Text>
          </View>
          <View>
            <Text className='text-xl font-bold mb-2'>Location</Text>
            <Text>
                {props.location}
            </Text>
          </View>
      </View>
    );
  
    
  
    const Reviews = () => (
      <ScrollView contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40
      }} className='flex mt-8'>
            {session.currentProfile == Profile.OWNER && (
              <Button className="mt-5 mb-5" onPress={() => router.push({pathname: '/review', params: {
                sitterId: props.sitterId
              }})}>Add Review</Button>
            )}
            {
                props.reviews?.length > 0
                ? props.reviews.map((review) => (
                    <ReviewDescription key={review.id} review={review} />
                ))
                : <Text>No reviews yet</Text>
            }
      </ScrollView>
    );
  
    const Services = () => (
      <View className='flex justify-center items-center mt-8'>
            <DisplayCardList value={props.services} Card={ServiceDisplayCard} emptyMessage='You have no services'/>
      </View>
    );


    const Pets = () => (
      <View className='flex justify-center items-center mt-8 w-11/12 mx-auto bg-slate-500'>
            <DisplayCardList value={props.pets} Card={PetDisplayCard} emptyMessage='You have no pets'/>
      </View>
    );

  
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState(
        props.services
        ? [
            { key: 'info', title: 'Info' },
            { key: 'services', title: 'Services' },
            { key: 'reviews', title: 'Reviews' },
            
        ] 
        : [
            { key: 'info', title: 'Info' },
            { key: 'pets', title: 'Pets' }
        ]
    );
  
    const renderTabBar = (props) => {
      const inputRange = props.navigationState.routes.map((x, i) => i);
      const tabWidth = width / props.navigationState.routes.length;
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
                className='align-center justify-center items-center h-12 transition-all'
                style={{ borderColor, borderBottomWidth: 2, width: tabWidth }}
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
          renderScene={SceneMap(
         props.services 
         ? {
              info: Info,
              services: Services,
              reviews: Reviews
              
          }
          : {
              info: Info,
              pets: Pets
          }
          )}
          onIndexChange={setIndex}
          initialLayout={{ width: width }}
          renderTabBar={renderTabBar}
          
      />
    )
  
  }
  