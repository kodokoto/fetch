import { View, Text, Image } from 'react-native'
import React from 'react'
import { Button, Input, Slider, TextArea } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import AddImageButton from '../components/AddPictureButton'

type ProfileFormProps = {
    name: string,
    location: string,
    bio: string,
    description: string,
    images: string[],
    proximityRadius?: number,
    setName: (name: string) => void,
    setLocation: (location: string) => void,
    setBio: (bio: string) => void,
    setDescription: (description: string) => void,
    setImages: (images: string[]) => void,
    setProximityRadius?: (proximityRadius: number) => void,
    handleLocationSearch: () => void,
}

export default function ProfileForm(formData : ProfileFormProps) {

  return (
    <>
        <View className='my-4'>
          <Text className='text-md font-semibold mb-2'>Name: </Text>
          <Input value={formData.name}  onChangeText={formData.setName}/>
        </View>
        
        <View className='my-4'>
          <Text className='text-md font-semibold mb-2'>A short bio: </Text>
          <Input value={formData.bio}  onChangeText={formData.setBio} maxLength={80}/>


          <View className='my-4'>
              <Text className='text-md font-semibold mb-2'>Give us an insight into your experience as a sitter:</Text>
              <TextArea 
                  h={20} 
                  placeholder="Text Area Placeholder" 
                  value={formData.description}
                  w="100%" 
                  autoCompleteType={undefined} 
                  onChangeText={
                      (text) => formData.setDescription(text) 
                  }
                  maxLength={200}
              />
          </View>

        <View className='my-4'>
          <Text className='text-md font-semibold mb-2'>Location: </Text>
          <Input value={formData.location}  onChangeText={formData.setLocation} InputRightElement={
            <Button className='bg-gray-200 rounded-l-none'>
              <Ionicons name="ios-location-outline" size={18} color="black" onPress={formData.handleLocationSearch}/>
            </Button>
          }/>
        </View>
        <View className='my-4'>
          <AddImageButton setImages={formData.setImages} />
        </View>

        {
            formData.proximityRadius && <View className='my-4'>
            <Text className='text-md font-semibold mb-2'>Proximity Radius: </Text>
            <Slider 
              value={formData.proximityRadius}
              onChange={formData.setProximityRadius}
              minValue={1}
              maxValue={20}
              step={1}
              className='w-11/12'
            >
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
            <Text className='text-md font-semibold mb-2'>{formData.proximityRadius} miles</Text>
          </View>
        }
        </View>
    </>
  )
}
