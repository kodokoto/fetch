import { View, Text, Dimensions, Image as RNImage } from 'react-native';
import { Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons'
import Carousel from 'react-native-reanimated-carousel';
import { Image } from '@prisma/client'
import {launchImageLibrary, MediaType} from 'react-native-image-picker';
import { api } from '../utils/trpc';
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'
import * as ImagePicker from 'expo-image-picker';
import AddPictureButton from './AddPictureButton';

export default function ProfileCarousel(props) {
    let showAddPictureButton = false;
    const width = Dimensions.get('window').width;

    const [session, _] = useAtom(sessionAtom)

    if(session.sitterId == props.sitterId){
        showAddPictureButton = true;
    }

    return (
        <>
        {   props.images.length > 0 
            ? <View>
                <Carousel
                loop
                width={width}
                height={width/ 1.5}
                autoPlay={false}
                data={props.images}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index, item }) => ( 
                    <RNImage source={{ uri: item.url }} style={{ width: width, height: width / 1.5 }} /> 
                )}
            />
            </View>
        : <View className='flex justify-center items-center w-full h-1/3 bg-gray-500'> 
            <Text className='text-white'>No images</Text> 
          </View>
        }
        
        <AddPictureButton showAddPictureButton={showAddPictureButton} />
        </>
    )
}