import { Text, View } from 'react-native'
import React from 'react'

type ProfileRatingProps = {
  rating: number
}

export default function ProfileRating(props) {
  return (
    <View className="flex flex-row">
      {[1, 2, 3, 4, 5].map((_, i) => {
        if (i < props.rating) {
          return (
            <Text key={i} className="text-xl text-yellow-500">
              &#9733;
            </Text>
          )
        } else {
          return (
            <Text key={i} className="text-xl text-grey-500">
              &#9733;
            </Text>
          )
        }
      })}
    </View>
  )
}
