import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import ChatPreview from 'app/components/ChatPreview'
import { Ionicons } from '@expo/vector-icons'
import { api } from 'app/utils/trpc'
import { useUser } from '@clerk/clerk-expo'
import { Skeleton } from 'native-base'

export default function Chat() {
  const [searchWord, setSearchWord] = useState('')

  const { user, isLoaded } = useUser()

  const email = user?.primaryEmailAddress.emailAddress

  const {
    data: currentUser,
    error,
    isLoading,
  } = api.user.byEmail.useQuery(user.primaryEmailAddress.emailAddress, { enabled: !!email })

  const currentUserId = currentUser?.id

  const {
    data: contactData,
    error: contactError,
    isLoading: contactIsLoading,
  } = api.user.contacts.useQuery(currentUserId, { enabled: !!currentUserId })

  const filtercontacts = (filterWord) => {
    const filteredcontacts = contactData.filter((user) => {
      return user.name.includes(filterWord)
    })
    return filteredcontacts
  }
  // if (!isLoaded || isLoading || contactIsLoading) return <Text>Loading...</Text>;
  // if (error || contactError) return <Text>{error.message}</Text>;

  return (
    <View>
      <View className="flex flex-row items-center bg-[#ede9e8] mx-4 mt-5 pl-3 h-10 rounded-3xl">
        <Ionicons name={'ios-search'} size={20} color={'gray'} className="mt-5 h-10" />
        <TextInput placeholder="Search..." className="border-0 h-10 ml-3" onChangeText={(e) => setSearchWord(e)} />
      </View>
      <Text className="text-blue-500 text-xl ml-4 mt-5">Messages</Text>
      {contactData
        ? filtercontacts(searchWord).map((user) => {
            const userId = user.id
            return (
              <ChatPreview
                senderId={currentUserId}
                receiverId={userId}
                name={user.name}
                key={user.id}
                imageUrl={user.imageUrl}
              />
            )
          })
        : null}
    </View>
  )
}
