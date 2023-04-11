import { View, Text, Dimensions, Image as RNImage } from 'react-native';
import { Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons'
import Carousel from 'react-native-reanimated-carousel';
import { Image } from '@prisma/client'
import * as ImagePicker from 'react-native-image-picker';

export default function ProfileCarousel(images: Image[]) {
    // var ImagePicker = require('react-native-image-picker');
    const width = Dimensions.get('window').width;

    return (
        <>
        {   images.length > 0 
            ? <Carousel
                loop
                width={width}
                height={width/ 1.5}
                autoPlay={false}
                data={images}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index, item }) => ( 
                    <RNImage source={{ uri: item.url }} style={{ width: width, height: width / 1.5 }} /> 
                )}
            />
        : <View className='flex justify-center items-center w-full h-1/3 bg-gray-500'> 
            <Text className='text-white'>No images</Text> 
          </View>
        }

        </>
    )
}