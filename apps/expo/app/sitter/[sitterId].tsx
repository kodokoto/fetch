import { Image, View, Text } from 'react-native'
import { Button, Box, NativeBaseProvider } from 'native-base'
import React from 'react'
import SitterProfileLocation from 'app/components/SitterProfileLocation'
import ProfileRating from 'app/components/ProfileRating'
import SitterProfileNextAvailable from 'app/components/SitterProfileNextAvaliable'
import { useRouter, useSearchParams } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import { api } from 'app/utils/trpc'
import Carousel from 'react-native-reanimated-carousel';

export default function SitterProfile() {
  const { sitterId } = useSearchParams()
  const router = useRouter()

  const { data: sitterData, error, isLoading } = api.sitter.byId.useQuery(Number(sitterId))


  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>

  return (
      <View className="flex flex-col justify-center items-center">
        <Text>Hello {sitterData.name}</Text>
    {/* 
        <SitterProfileLocation {...mockSitter} />

        <SitterProfileNextAvailable {...mockSitter} /> */}
      </View>
  )
}
