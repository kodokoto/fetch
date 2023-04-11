import { Button, ScrollView, Select, FormControl, TextArea,Text,Input, Box } from "native-base";
import { api } from 'app/utils/trpc'
import { View } from 'react-native'
import React from "react";
import { sessionAtom } from 'app/utils/storage';
import { useAtom } from 'jotai';
import OnePetTypeSelect from "app/components/OnePetTypeSelect";
import { Stack } from "expo-router";


export default function petCreateForm() {
    // const router = useRouter();
    const [session, _] = useAtom(sessionAtom)
    const mutation = api.pet.create.useMutation()
    const handleSubmit = () => {
        mutation.mutate({
          name: name,
          type: getPetByBoolean(),
          ownerId: session.ownerId,
          description: description,
          imageUrl: 'https://i.pinimg.com/736x/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg' // delete later
        })
        setName(""),
        setSelectedPetType(""),
        setDescription("")
      }

      const [SelectedPetType, setSelectedPetType] = React.useState("DOG")
      const [name, setName] = React.useState("")
      const [description, setDescription] = React.useState("")
      const [petType, setPetType] = React.useState({
        "DOG": false,
        "CAT": false,
        "OTHER": false,
    });

    function getPetByBoolean() {
        const availablePetTypes = Object.keys(petType);
        const PetType = availablePetTypes.find((type) => petType[type] === true);
        console.log(PetType)
        return PetType
    }

    // const availablePetTypes = Object.keys(petType);
    // const firstAvailablePetType = availablePetTypes.find((type) => petType[type]);

    // if (firstAvailablePetType) {
    // setSelectedPetType(firstAvailablePetType);
    // }


  
      return (
        <>
          <View className="mx-4">
            <Text className="font-bold text-2xl ml-2 mt-5">Name:</Text>
            <Text className="ml-2 mb-2">What is your pets name?</Text>
            <Input value={name} onChangeText={text => setName(text)} variant={'rounded'} ></Input>
            <Text className="font-bold text-2xl ml-2 mt-2">Animals:</Text>
            <Text className="ml-2 mb-2">What animal do you want taken care of?</Text>
            <OnePetTypeSelect value={petType} onChange={setPetType} />
            <Text className="font-bold text-2xl ml-2 mt-2">Description:</Text>
            <Text className="ml-2 mb-2">Tell pet sitter a bit about your pet.</Text>
            <TextArea value={description} onChangeText={text => setDescription(text)} autoCompleteType={undefined}></TextArea>
            <View className='flex-col my-5'>
                <Button className='h-12 rounded-full bg-blue-500 w-11/12 my-4 mx-auto' onPress={() => handleSubmit()}>
                    <Text className='text-white'>Submit</Text>
                </Button>
            </View>
          </View>

        </>
      )
  }