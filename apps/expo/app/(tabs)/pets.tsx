import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { Button } from 'native-base'
import { useAtom } from 'jotai'
import { sessionAtom } from 'app/utils/storage'
import { api } from 'app/utils/trpc'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

type PetDescriptionCardProps = {
    name: string
    description: string
    imageUrl: string
    type: string
  }
  
function PetDescriptionCard(props: PetDescriptionCardProps) {

    return (
      <View className='flex-row h-24 items-center '>
        <View className='flex-col ml-2'>
          <Image
            className='rounded-full w-12 h-12 mr-4'  
            source={{
              uri: props.imageUrl,
            }}
          />
        </View>
        <View className='flex-col justify-center'>
          <Text className='text-lg font-semibold'>{props.name}</Text>
          <Text className='text-sm'>{props.description}</Text>
        </View>
      </View>
    )
  }

export default function pets() {

    const [session, _] = useAtom(sessionAtom)
    const router = useRouter();

    const { data: pets, isLoading } = api.pet.byOwnerId.useQuery(session.ownerId, { cacheTime: 0 })

    if (isLoading) {
        return <Text>Loading...</Text>
    }
    return (
      <View className='my-2'>
          <Text className='text-2xl font-semibold mb-2'>Your pets</Text>
          {
            pets && pets.map((pet, index) => {
              return (
                  <PetDescriptionCard {...pet} key={index} />
              )
            })
          }
          {
            !pets || pets?.length < 4 
            ? (
              <Button className='bg-transparent h-24' onPress={() => router.push('/create/pet')}>
                <View className='flex-row items-center justify-start'>
                  <Ionicons name="add" size={24} color="black" />
                  <Text className='ml-4'>Add Pet</Text>
                </View>
              </Button>
            ) 
            : <Text>You have reached your maximum amout of pets, please subscribe to our pro plan to get more!</Text>
          }
        </View>
    )
  }