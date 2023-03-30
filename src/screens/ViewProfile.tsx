import { Image, View, Text } from 'react-native'
import React from 'react'
import SitterProfileLocation from '../components/SitterProfileLocation'
import ProfileRating from '../components/ProfileRating'

export default function ViewProfile() {
  return (
    <View>
        <Image 
            style={{
                width: 100, 
                height: 100,
                borderRadius: 50
            }}
            source={require('../assets/pfp.png')}
        />
        {/* PLaceholder components */}
        <Text className="text-orange">Leonard Lungu</Text>
        <Text>Pet Sitter</Text>
        <ProfileRating/>
        <SitterProfileLocation/>
    </View>
  )
}