import { View, Text, Image} from 'react-native'
import { Pet } from '@prisma/client';
import React from 'react'

type PetDescriptionProps = {
    pet: Pet
}

export default function PetDescription(props) {
    return (
        <View className='flex-row h-24 items-center '>
            <View className='flex-col ml-2'>
            <Image
                className='rounded-full w-12 h-12 mr-4'  
                source={{
                uri: props.pet.imageUrl,
                }}
            />
            </View>
            <View className='flex-col justify-center'>
            <Text className='text-lg font-semibold'>{props.pet.name}</Text>
            <Text className='text-sm'>{props.pet.description}</Text>
            </View>
        </View>
    )
}