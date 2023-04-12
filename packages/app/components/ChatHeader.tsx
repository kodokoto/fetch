import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'


type ChatHeaderProps = {
    receiverId: string
    senderId: string
    receiverName: string
    receiverImgUrl: string
  }

export default function ChatHeader(props: ChatHeaderProps) {
    const router = useRouter()
    const [session, _] = useAtom(sessionAtom)


    return (
        <View>
            <TouchableOpacity
                onPress={() =>
                    session.currentProfile === Profile.SITTER 
                    ? router.push({
                        pathname: `owner/${props.receiverId}`,
                        params: {
                            ownerId: props.receiverId,
                            serviceType: undefined,
                            day: undefined,
                            timeOfDay: undefined,
                        },
                    })
                    : router.push({
                        pathname: `sitter/${props.receiverId}`,
                        params: {
                            sitterId: props.receiverId,
                            serviceType: undefined,
                            day: undefined,
                            timeOfDay: undefined,
                        },
                    })
                }
                className="flex flex-row mt-5"
            >
                <View className="flex items-center justify-center ml-4 h-14 w-14">
                <ImageBackground
                    resizeMode="contain"
                    source={{ uri: props.receiverImgUrl }}
                    className="flex items-center justify-center h-12 w-12"
                />
                </View>
                <View className="flex justify-center h-16">
                <Text className="ml-4 font-bold text-lg">{props.receiverName}</Text>
                </View>
            </TouchableOpacity>
        </View>

    )
}