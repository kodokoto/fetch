import { View, Text } from 'react-native'
import React from 'react'
import { useAtom } from 'jotai'
import { sessionAtom } from 'app/utils/storage'
import { api } from 'app/utils/trpc'
import { useRouter } from 'expo-router'
import { Pet } from '@prisma/client'
import DisplayCardList from 'app/components/DisplayCardList'
import PetDisplayCard from 'app/components/PetDisplayCard'

export default function Pets() {

    const [session, _] = useAtom(sessionAtom)
    const router = useRouter();
    console.log(session)
    const [pets, setPets] = React.useState([] as Pet[])
    const { isLoading } = api.pet.byOwnerId.useQuery(session.ownerId, { cacheTime: 0, onSuccess: setPets})
    const mutation = api.pet.delete.useMutation()

    const handleDeletePet = (pet: Pet) => {
      console.log("Delete")
      mutation.mutateAsync({
        id: pet.id
      }).then(() => {
        setPets(pets.filter((p: Pet) => p.id !== pet.id))
      })
    }

    const handleAddPet = () => {
      router.push('/create/pet')
    }

    if (isLoading) {
        return <Text>Loading...</Text>
    }
    return (
      <View className='my-2 m-8'>
          <Text className='text-2xl mb-2'>Your pets</Text>
          <DisplayCardList 
            Card={PetDisplayCard} 
            editable 
            value={pets} 
            onAdd={handleAddPet} 
            onDelete={handleDeletePet}
            addButtonTitle='Add a pet'
            emptyMessage='You have no pets yet!'
            maxedOutMessage='You have reached your maximum amout of pets, please subscribe to our pro plan to get more!'
            />
        </View>
    )
  }