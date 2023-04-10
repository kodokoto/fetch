import { Button, ScrollView, Select, FormControl, TextArea, Box } from "native-base";
import { api } from 'app/utils/trpc'
import { Owner } from "db";
import React from "react";
import { useRouter } from 'expo-router'

export default function petCreateForm(props: Owner) {
    const router = useRouter();
    const mutation = api.pet.create.useMutation()
    const handleSubmit = () => {
        mutation.mutate({
          name: name,
          type: SelectedPetType,
          ownerId: props.id,
          description: description
        })
        setName(""),
        setSelectedPetType(""),
        setDescription("")
      }

    const [SelectedPetType, setSelectedPetType] = React.useState("")
    const [name, setName] = React.useState("")
    const [description, setDescription] = React.useState("")

    return (
        <ScrollView>
            <FormControl.Label>Name:</FormControl.Label>
            <TextArea value={name} onChangeText={text => setName(text)} autoCompleteType={undefined} h={8}></TextArea>
            <FormControl.Label>PetType:</FormControl.Label>
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
            <FormControl.Label>Description:</FormControl.Label>
            <TextArea value={description} onChangeText={text => setDescription(text)} autoCompleteType={undefined}></TextArea>
            <Box className="flex-wrap flex-row mt-2 mb-10">
                <Button className="ml-auto rounded-2xl" onPress={handleSubmit}>Add Pet</Button>
                <Button className="mr-auto ml-2 rounded-2xl">Cancel</Button>
            </Box>
            
        </ScrollView>
    )
}