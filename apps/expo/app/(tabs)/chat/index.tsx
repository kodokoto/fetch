import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import ChatPreview from 'app/components/ChatPreview'
import { Ionicons } from '@expo/vector-icons'
import { api } from 'app/utils/trpc'
import { useUser, useClerk } from '@clerk/clerk-expo'
import { Skeleton } from 'native-base'
import { useAtom } from 'jotai'
import { sessionAtom } from 'app/utils/storage'
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from 'expo-router'

export default function Chat() {
  const [searchWord, setSearchWord] = useState('')
  const [filteredContacts, setFilteredContacts] = useState([]);
  const isFocused = useIsFocused();

  const [session, setSession] = useAtom(sessionAtom)
  let isOwner = false;
  let isSitter = false;

  const { user, isLoaded } = useUser()
  const userId = user?.id

  const { data: owner } = api.owner.byUserId.useQuery(userId, { enabled: !!userId })
  const ownerId = owner?.id

  const { data: sitter } = api.sitter.byUserId.useQuery(userId, { enabled: !!userId })
  const sitterId = sitter?.id

  const { data: contacts } = session.currentProfile.toString() == "Owner" ? api.owner.contacts.useQuery(ownerId, { enabled: !!ownerId }) :
  api.sitter.contacts.useQuery(sitterId, { enabled: !!sitterId });

  console.log("Contacts: " + JSON.stringify(contacts));

  if(session.currentProfile.toString() == "Owner"){
    isOwner = true;
  } else {
    isSitter = true;
  }

  let filtercontacts = (filterWord) => {
    const filteredcontacts = contacts.filter((sitter) => {
      return sitter.name.includes(filterWord)
    })
    return filteredcontacts
  }

  useEffect(() => {
    console.log("Meat");
    
    filtercontacts = (filterWord) => {
      const filteredcontacts = contacts.filter((sitter) => {
        return sitter.name.includes(filterWord)
      })
      return filteredcontacts
    }
  }, [isFocused])
  if (!isLoaded) return null
  // if (!isLoaded || isLoading || contactIsLoading) return <Text>Loading...</Text>;
  // if (error || contactError) return <Text>{error.message}</Text>;

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
                receiverId={isSitter ? sitterId : ownerId}
                senderId={user.id}
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
