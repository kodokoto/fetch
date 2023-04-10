import { Profile } from 'next-auth';
import * as React from 'react';
import { Animated, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Pet, Review, Service } from '@prisma/client';

type ProfileTabProps = {
    description: string;
    location: string;
    reviews?: Review[];
    services?: Service[];
    pets?: Pet[];
}

export default function ProfileTabs(props: ProfileTabProps) {

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
      <View className='flex justify-center items-center mt-8'>
            {
                props.reviews?.length > 0
                ? props.reviews.map((review) => (
                    null
                    // <ReviewDescription key={review.id} review={review} />
                ))
                : <Text>No reviews yet</Text>
            }
      </View>
    );
  
    const Services = () => (
      <View className='flex justify-center items-center mt-8'>
            {
                props.services?.length > 0
                ? props.services.map((review) => (
                    null
                    // <ServiceDescription key={review.id} review={review} />
                ))
                : <Text>No services yet</Text>
            }
      </View>
    );


      const Pets = () => (
      <View className='flex justify-center items-center mt-8'>
            {
                props.pets?.length > 0
                ? props.pets.map((review) => (
                    null
                    // <PetDescription key={review.id} review={review} />
                ))
                : <Text>No pets yet</Text>
            }
      </View>
    );

  
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState(
        props.services
        ? [
            { key: 'info', title: 'Info' },
            { key: 'reviews', title: 'Reviews' },
            { key: 'services', title: 'Services' },
        ] 
        : [
            { key: 'info', title: 'Info' },
            { key: 'pets', title: 'Pets' },
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
              reviews: Reviews,
              services: Services
          }
          : {
                info: Info,
                pets: Pets,
          }
          )}
          onIndexChange={setIndex}
          initialLayout={{ width: width }}
          renderTabBar={renderTabBar}
          
      />
    )
  
  }
  