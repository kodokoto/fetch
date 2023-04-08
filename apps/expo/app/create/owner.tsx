import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'native-base'
import { api } from 'app/utils/trpc'
import { useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'


export default function owner() {
  const router = useRouter()
  const { user, isLoaded } = useUser();
  const mutation = api.owner.create.useMutation();

  const handleProfileCreation = async () => {
    console.log('create profile')
    const {name} = await mutation.mutateAsync({
      userId: user.id,
      name: user.firstName,
      imageUrl: user.profileImageUrl,
    })
    if (name) {
      router.push('/home')
    }
    
  }

  if (!isLoaded) return null;

  return (
    <View>
        <Button onPress={handleProfileCreation}>
            <Text>Create</Text>
        </Button>
    </View>
  )
}