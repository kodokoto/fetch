import { View, Text, Image } from 'react-native'
import { Avatar } from 'native-base'
import { Review } from '@prisma/client'
import ProfileRating from './ProfileRating'
import { api } from '../utils/trpc'
import React from 'react'

type PetDescriptionProps = {
  review: Review
}

export default function ReviewDescription(props) {
  const { data: ownerData } = api.owner.byId.useQuery(props.review.fromId)
  // console.log("Owner Data: " + ownerData.name);

  return (
    <View className="flex-col items-flex-start border border-x-0 border-t-0 border-gray-400 mt-3 p-2 pb-5 w-80">
      <View className="flex-row">
        <Avatar source={{ uri: ownerData?.imageUrl }} className="w-12 h-12 md:w-48 md:h-auto float-left">
          AT
        </Avatar>
        <View>
          <Text className="ml-4 mt-auto mb-auto">By: {ownerData && ownerData.name}</Text>
          <Text className="ml-4 mt-auto mb-auto">{props.review.updatedAt.split('T')[0]}</Text>
        </View>
      </View>
      <View>
        <ProfileRating rating={props.review.rating} />
      </View>
      <Text>{props.review.content}</Text>
    </View>
  )
}
