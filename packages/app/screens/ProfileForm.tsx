import { View, Text, Image } from 'react-native'
import React from 'react'
import { Button, Input, Slider, TextArea } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import AddImageButton from '../components/AddPictureButton'

type ProfileFormProps = {
  name: string
  location: string
  bio: string
  description: string
  images: string[]
  proximityRadius?: number
  setName: (name: string) => void
  setLocation: (location: string) => void
  setBio: (bio: string) => void
  setDescription: (description: string) => void
  setImages: (images: string[]) => void
  setProximityRadius?: (proximityRadius: number) => void
  handleLocationSearch: () => void
  handleSubmit: () => void
}

export default function ProfileForm(formData: ProfileFormProps) {
  return (
    <View className="m-4 mt-0">
      <View className="my-4">
        <Text className="text-md font-semibold mb-2">Name: </Text>
        <Input value={formData.name} placeholder="Enter your name" onChangeText={formData.setName} rounded={'full'} />
      </View>

      <View className="my-4">
        <Text className="text-md font-semibold mb-2">A short bio: </Text>
        <Input
          value={formData.bio}
          placeholder="Enter a short bio"
          onChangeText={formData.setBio}
          maxLength={80}
          rounded={'full'}
        />

        <View className="my-4 mt-8">
          <Text className="text-md font-semibold mb-2">Give us an insight into your experience as a sitter:</Text>
          <TextArea
            h={20}
            placeholder="Enter a description of yourself"
            value={formData.description}
            w="100%"
            autoCompleteType={undefined}
            onChangeText={(text) => formData.setDescription(text)}
            maxLength={200}
            rounded={'2xl'}
          />
        </View>

        <View className="my-4">
          <Text className="text-md font-semibold mb-2">Location: </Text>
          <Input
            value={formData.location}
            onChangeText={formData.setLocation}
            rounded={'full'}
            InputRightElement={
              <Button className="bg-gray-200 rounded-l-none">
                <Ionicons name="ios-location-outline" size={18} color="black" onPress={formData.handleLocationSearch} />
              </Button>
            }
          />
        </View>
        <View className="my-4">
          <Text className="text-md font-semibold mb-2">Upload some pictures: </Text>
          <AddImageButton setImages={formData.setImages} />
        </View>

        {formData.proximityRadius && (
          <View className="my-4">
            <Text className="text-md font-semibold mb-2">Proximity Radius: </Text>
            <Slider
              value={formData.proximityRadius}
              onChange={formData.setProximityRadius}
              minValue={1}
              maxValue={20}
              step={1}
              className="w-11/12"
              colorScheme={'fetch'}
            >
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
            <Text className="text-md font-semibold mb-2">{formData.proximityRadius} miles</Text>
          </View>
        )}

        <View className="my-4">
          <Button className="h-12 rounded-full bg-blue-500 w-full my-4 mx-auto" onPress={() => formData.handleSubmit()}>
            <Text className="text-white font-bold">Submit</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}
