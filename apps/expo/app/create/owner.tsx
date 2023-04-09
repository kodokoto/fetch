import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'native-base'
import { api } from 'app/utils/trpc'
import { useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { useAtom } from 'jotai'
import { sessionAtom } from 'app/utils/storage'

export default function OwnerProfileCreate() {
  const router = useRouter()
  const { user, isLoaded } = useUser()
  const mutation = api.owner.create.useMutation()
  const [session, setSession] = useAtom(sessionAtom)

  const handleProfileCreation = () => {
    if (user && user.firstName) {
      mutation.mutateAsync({
        userId: user.id,
        name: user.firstName,
        imageUrl: user.profileImageUrl,
      }).then(
        (ownerProfile) =>{
          setSession({currentProfile: 'Owner', ownerId: ownerProfile.id, sitterId: session.sitterId})
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
