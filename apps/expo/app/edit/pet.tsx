import { Button, TextArea, Text, Input, Box } from 'native-base'
import { api } from 'app/utils/trpc'
import { View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'expo-router'
import AddImageButton from 'app/components/AddPictureButton'
import PetTypeSelect from 'app/components/PetTypeSelect'
import { Stack } from 'expo-router'

export default function petCreateForm() {
  const { id } = useSearchParams()
  const mutation = api.pet.update.useMutation()
  const router = useRouter()
  const [submitPressed, setSubmitPressed] = useState(false)
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [petType, setPetType] = React.useState({
    DOG: false,
    CAT: false,
    OTHER: false,
  })
  const [images, setImages] = React.useState([])

  const { isLoading } = api.pet.byId.useQuery(Number(id), {
    onSuccess: (data) => {
      setName(data.name)
      setDescription(data.description)
      setPetType({
        DOG: data.type === 'DOG',
        CAT: data.type === 'CAT',
        OTHER: data.type === 'OTHER',
      })
    },
  })

  useEffect(() => {
    const handleSubmit = () => {
      mutation
        .mutateAsync({
          id: Number(id),
          name: name,
          type: getPetByBoolean(),
          description: description,
          imageUrl: images ? String(images) : 'https://i.pinimg.com/736x/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg', // delete later
        })
        .then(() => {
          router.replace('/pets')
        })
    }

    if (submitPressed && images.length > 0) {
      handleSubmit()
    }
  }, [images, submitPressed])

  function getPetByBoolean() {
    const availablePetTypes = Object.keys(petType)
    const PetType = availablePetTypes.find((type) => petType[type] === true)
    return PetType
  }

  if (isLoading) {
    return <Text>Loading...</Text>
  }
  return (
    <>
      <Stack.Screen options={{ headerTitle: 'Edit Pet' }} />
      <View className="mx-4">
        <Text className="font-bold text-2xl ml-2 mt-5">Name:</Text>
        <Input value={name} onChangeText={(text) => setName(text)} variant={'rounded'}></Input>
        <Text className="font-bold text-2xl ml-2 mt-2">Animals:</Text>
        <PetTypeSelect toggle value={petType} onChange={setPetType} />
        <Text className="font-bold text-2xl ml-2 mt-2">Description:</Text>
        <TextArea
          value={description}
          onChangeText={(text) => setDescription(text)}
          autoCompleteType={undefined}
        ></TextArea>
        <View className="mt-10 ml-10 mr-10">
          <AddImageButton setImages={setImages} aspect={[4, 3]} />
        </View>
        <View className="flex-col my-5">
          <Button className="h-12 rounded-full bg-blue-500 w-11/12 my-4 mx-auto" onPress={() => setSubmitPressed(true)}>
            <Text className="text-white">Edit details</Text>
          </Button>
        </View>
      </View>
    </>
  )
}
