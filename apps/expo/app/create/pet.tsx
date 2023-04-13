import { Button, TextArea, Text, Input, Box } from 'native-base'
import { api } from 'app/utils/trpc'
import { View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { sessionAtom } from 'app/utils/storage'
import { useAtom } from 'jotai'
import PetTypeSelect from 'app/components/PetTypeSelect'
import { useRouter, useSearchParams } from 'expo-router'
import AddImageButton from 'app/components/AddPictureButton'

export default function petCreateForm() {
  const [session, _] = useAtom(sessionAtom)
  const { redirectUrl } = useSearchParams()
  const mutation = api.pet.create.useMutation()
  const [images, setImages] = useState([])
  const [submitPressed, setSubmitPressed] = useState(false)
  const router = useRouter()

  function handleSubmit() {

    mutation
      .mutateAsync({
        name: name,
        type: getPetByBoolean(),
        ownerId: session.ownerId,
        description: description,
        imageUrl: images ? String(images) : 'https://i.pinimg.com/736x/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg', // delete later
      })
      .then(() => {
        redirectUrl ? router.replace(String(redirectUrl)) : router.replace('/pets')
      })
  }

  useEffect(() => {
    if (submitPressed && images.length > 0) {
      handleSubmit()
    }
  }, [images, submitPressed])

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [petType, setPetType] = React.useState({
    DOG: false,
    CAT: false,
    OTHER: false,
  })

  function getPetByBoolean() {
    const availablePetTypes = Object.keys(petType)
    const PetType = availablePetTypes.find((type) => petType[type] === true)
    return PetType
  }

  return (
    <>
      <View className="mx-4">
        <Text className="font-bold text-2xl ml-2 mt-5">Name:</Text>
        <Text className="ml-2 mb-2">What is your pet's name?</Text>
        <Input value={name} onChangeText={(text) => setName(text)} variant={'rounded'}></Input>
        <Text className="font-bold text-2xl ml-2 mt-2">Animals:</Text>
        <Text className="ml-2 mb-2">What animal do you want taken care of?</Text>
        <PetTypeSelect toggle value={petType} onChange={setPetType} />
        <Text className="font-bold text-2xl ml-2 mt-2">Description:</Text>
        <Text className="ml-2 mb-2">Tell us a bit about your pet.</Text>
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
            <Text className="text-white">Submit</Text>
          </Button>
        </View>
      </View>
    </>
  )
}
