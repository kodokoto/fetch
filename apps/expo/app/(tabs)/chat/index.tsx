import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import ChatPreview from 'app/components/ChatPreview'
import { Ionicons } from '@expo/vector-icons'
import { api } from 'app/utils/trpc'
import { useUser } from '@clerk/clerk-expo'
import { Skeleton } from 'native-base'
import { useAtom } from 'jotai'
import { sessionAtom } from 'app/utils/storage'
import { useIsFocused } from '@react-navigation/native'

export default function Chat() {
  const [searchWord, setSearchWord] = useState('')
  const isFocused = useIsFocused()

  const [session, _] = useAtom(sessionAtom)
  let isOwner = false
  let isSitter = false

  const { user, isLoaded } = useUser()
  const userId = user?.id


  const { data: owner, isLoading: ownerIsloading } = api.owner.byUserId.useQuery(userId, { enabled: !!userId })
  const ownerId = owner?.id

  const { data: sitter, isLoading: sitterIsLoading } = api.sitter.byUserId.useQuery(userId, { enabled: !!userId })
  const sitterId = sitter?.id

  const { data: contacts } =
    session.currentProfile.toString() == 'Owner'
      ? api.owner.contacts.useQuery(ownerId, { enabled: !!ownerId })
      : api.sitter.contacts.useQuery(sitterId, { enabled: !!sitterId })


  if (session.currentProfile.toString() == 'Owner') {
    isOwner = true
  } else {
    isSitter = true
  }


  let filtercontacts = (filterWord) => {
    const filteredcontacts = contacts.filter((sitter) => {
      return sitter.name.includes(filterWord)
    })
    return filteredcontacts
  }

  useEffect(() => {

    filtercontacts = (filterWord) => {
      const filteredcontacts = contacts.filter((sitter) => {
        return sitter.name.includes(filterWord)
      })
      return filteredcontacts
    }
  }, [isFocused])
  if (!isLoaded) return null
  if (ownerIsloading || sitterIsLoading) return <Skeleton height={100} />

  return (
    <View>
      <View className="flex flex-row items-center bg-[#ede9e8] mx-4 mt-5 pl-3 h-10 rounded-3xl">
        <Ionicons name={'ios-search'} size={20} color={'gray'} className="mt-5 h-10" />
        <TextInput placeholder="Search..." className="border-0 h-10 ml-3" onChangeText={(e) => setSearchWord(e)} />
      </View>
      <Text className="text-blue-500 text-xl ml-4 mt-5">Messages</Text>
      {contacts
        ? filtercontacts(searchWord).map((user) => {
            const userId = user.id
            return (
              <ChatPreview
                senderId={isSitter ? session.sitterId : user.id}
                receiverId={isOwner ? session.ownerId : user.id}
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
