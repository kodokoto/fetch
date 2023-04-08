import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { api } from 'app/utils/trpc'

type ChatPreviewProps = {
  ownerId: number
  sitterId: number
  name: string
  imageUrl: string
}

export default function ChatPreview(props: ChatPreviewProps) {
  const router = useRouter()
  const {
    data: mostRecentMessage,
    error,
    isLoading,
  } = api.message.latestBetweenUsers.useQuery({ ownerId: props.ownerId, sitterId: props.sitterId })
  if (isLoading) return <Text>Loading...</Text>
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '/messages',
            params: {
              ownerId: props.ownerId,
              sitterId: props.sitterId,
              receiverName: props.name,
              receiverImageUrl: props.imageUrl,
            },
          })
        }
        className="flex flex-row mt-5"
      >
        <View className="flex items-center justify-center ml-4 h-14 w-14">
          <ImageBackground
            resizeMode="contain"
            source={{ uri: props.imageUrl }}
            className="flex items-center justify-center h-12 w-12"
          />
        </View>
        <View className="flex justify-center h-16">
          <Text className="ml-4 font-bold text-lg">{props.name}</Text>
          <Text className="ml-4">{mostRecentMessage.content}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
