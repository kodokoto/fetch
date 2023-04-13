import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Create() {
  const router = useRouter()


  return (
    <SafeAreaView>
    <View className="flex flex-col justify-center items-center gap-10">
      <View>
      <Text className="  w-3/5 text-md font-[Vulf-mono]">Welcome to:</Text>
      <Text className="text-7xl pt-4 font-[Vulf-mono]">fetch</Text>

      </View>
      <Text className="">Lets get you started by creating a profile</Text>
      <Text className="">What are you looking for?</Text>
      <TouchableOpacity
        className="bg-gray-200 rounded-xl p-6 border-2 border-gray-400"
        onPress={() => {
          router.push('/create/owner')
        }}
      >
        <Text>Someone to take care of my pet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-gray-200 rounded-xl p-6 border-2 border-gray-400"
        onPress={() => {
          router.push('/create/sitter')
        }}
      >
        <Text>Take care of someone elses pet</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>

  )
}
