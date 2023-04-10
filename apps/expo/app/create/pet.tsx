import { Button, Select,Text, Input, TextArea } from "native-base";
import { View } from "react-native";
import { api } from 'app/utils/trpc'
import React from "react";
import { sessionAtom } from 'app/utils/storage';
import { useAtom } from 'jotai';

export default function petCreateForm() {
    const [session, _] = useAtom(sessionAtom)
    const mutation = api.pet.create.useMutation()
    const handleSubmit = () => {
        mutation.mutate({
          name: name,
          type: SelectedPetType,
          ownerId: session.ownerId,
          description: description
        })
        setName(""),
        setSelectedPetType(""),
        setDescription("")
      }

      const [SelectedPetType, setSelectedPetType] = React.useState("DOG")
      const [name, setName] = React.useState("")
      const [description, setDescription] = React.useState("")
  
      return (
          <View className="mx-4">
                <Text className="font-bold text-2xl ml-2 mt-5">Name:</Text>
                <Text className="ml-2 mb-2">What is your pets name?</Text>
                <Input value={name} onChangeText={text => setName(text)} className="rounded-2xl"></Input>
                <Text className="font-bold text-2xl ml-2">Animals:</Text>
                <Text className="ml-2 mb-2">What animal do you want taken care of?</Text>
                <Select 
                    selectedValue={SelectedPetType}
                    onValueChange={(itemValue) => setSelectedPetType(itemValue)}
                >
                    <Select.Item label="Dog" value="DOG" />
                    <Select.Item label="Cat" value="CAT" />
                    <Select.Item label="Bird" value="BIRD" />
                    <Select.Item label="Fish" value="FISH" />
                    <Select.Item label="Other" value="OTHER" />
                </Select>
                <Text className="font-bold text-2xl ml-2">Description:</Text>
                <Text className="ml-2 mb-2">Tell pet sitter a bit about your pet.</Text>
                <TextArea value={description} onChangeText={text => setDescription(text)} autoCompleteType={undefined}></TextArea>
                <View className='flex-col my-5'>
                    <Button className='h-12 rounded-full bg-blue-500 w-11/12 my-4 mx-auto' onPress={() => handleSubmit()}>
                        <Text className='text-white'>Submit</Text>
                    </Button>
                </View>
          </View>
      )
  }