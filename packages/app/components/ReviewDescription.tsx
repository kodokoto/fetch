import { View, Text, Image} from 'react-native'
import { Review } from '@prisma/client';
import ProfileRating from './ProfileRating';
import React from 'react'

type PetDescriptionProps = {
    review: Review
}

export default function ReviewDescription(props) {
    return (
        <View className='flex-row h-24 items-center '>
            <Text>{props.review.updatedAt}</Text>
            <Text>{props.review.from.name}</Text>
            <ProfileRating rating={props.review.rating} />
            <Text>{props.review.content}</Text>
        </View>
    )
}