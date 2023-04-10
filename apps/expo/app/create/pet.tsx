import { Button, ScrollView, Select, FormControl, TextArea, CheckIcon, VStack } from "native-base";
import { api } from 'app/utils/trpc'
import { Owner } from "db";
import React from "react";

export default function petCreateForm(props: Owner) {

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
            <TextArea value={name} onChangeText={text => setName(text)} autoCompleteType={undefined}></TextArea>
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
            <Button onPress={handleSubmit}>Add Pet</Button>
        </ScrollView>
    )
}