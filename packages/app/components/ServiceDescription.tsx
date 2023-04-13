import { View, Text } from 'react-native'
import { Service } from '@prisma/client';
import React from 'react'

type ServiceDescriptionProps = {
    service: Service
}

export default function ServiceDescription(props) {
    return (
        <View className='flex flex-col gap-2 mx-4 my-0'>
            <Text className='text-md font-bold mb-2'>{props.service.description}</Text>
            <Text>Price per hour: {props.service.price}</Text>
            <Text>Duration: {props.service.duration}</Text>
        </View>
    )
}