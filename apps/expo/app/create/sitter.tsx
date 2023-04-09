import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'native-base'
import { api } from 'app/utils/trpc'
import { useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'


export default function SitterProfileCreate() {
  const router = useRouter()
  const { user, isLoaded } = useUser()
  const mutation = api.sitter.create.useMutation()
  const [session, setSession] = useAtom(sessionAtom)

  const handleProfileCreation = () => {
    if (user && user.firstName) { 
      mutation.mutateAsync({
        userId: user.id,
        name: user.firstName,
        imageUrl: user.profileImageUrl,
      }).then(
        (sitterProfile) =>{
          setSession({currentProfile: Profile.SITTER, ownerId: session.ownerId, sitterId: sitterProfile.id})
          router.push('/home')
        } 
      )
    } else {
      console.log('User not found')
    }
  }

  if (!isLoaded) return null

  return (
    <View>
      <Button onPress={handleProfileCreation}>
        <Text>Create</Text>
      </Button>
    </View>
  )
}
