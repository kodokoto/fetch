import { View, Text, Keyboard, ScrollView, TouchableOpacity } from 'react-native'
import { Box, TextArea } from 'native-base'
import React, { useEffect, useState, useRef } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ChatLog, { FilteredMessages } from 'app/components/ChatLog'
import { useSearchParams, useRouter } from 'expo-router'
import { api } from 'app/utils/trpc'
import { useAtom } from 'jotai'
import { sessionAtom } from 'app/utils/storage'
import { Message } from '@prisma/client'

export default function Messages() {
  const { receiverId, senderId, receiverName, receiverImgUrl } = useSearchParams()
  const router = useRouter()
  const [session, _] = useAtom(sessionAtom)
  const [filteredMessages, setfilteredMessages] = useState<FilteredMessages[]>([])


  const { data, error, isLoading } = api.message.betweenUsers.useQuery(
    { ownerId: String(receiverId), sitterId: String(senderId) },
    {
      onSuccess: (data: Message[]) => {
        // filter out id from each message
        const filteredData = data.map((message) => {
          return {
            content: message.content,
            createdAt: message.createdAt,
            ownerId: message.ownerId,
            sitterId: message.sitterId,
            sender: message.sender,
          }
        })


        setfilteredMessages(filteredData)
      },
    }
  )

  const mutation = api.message.create.useMutation()

  // const { username, mostRecentMessage } = route.params;
  const [showSendButton, setShowSendButton] = useState(false)
  const [currentMessageContent, setCurrentMessageContent] = useState('')

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      this.scrollView.scrollToEnd({ animated: true })
    })
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      return
    })

    return () => {
      keyboardShowListener.remove()
      keyboardHideListener.remove()
    }
  }, [])

  useEffect(() => {
    if (currentMessageContent == '') {
      setShowSendButton(false)
    } else {
      setShowSendButton(true)
    }
  }, [currentMessageContent])

  const onSend = () => {
    mutation.mutate({
      content: currentMessageContent,
      ownerId: String(senderId),
      sitterId: String(receiverId),
      sender: String(session.currentProfile.toUpperCase()),
    })
    setfilteredMessages([
      ...filteredMessages,
      {
        content: currentMessageContent,
        createdAt: new Date(),
        ownerId: String(receiverId),
        sitterId: String(senderId),
        sender: session.currentProfile.toUpperCase(),
      },
    ])
    setCurrentMessageContent('')
  }
  if (isLoading) return <Text>Loading...</Text>

  return (
    <>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={{
          display: 'flex',
          justifyContent: 'space-between',
          flex: 1,
          paddingBottom: 30,
        }}
      >
        <ScrollView
          ref={(ref) => {
            this.scrollView = ref
          }}
          onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}
          keyboardShouldPersistTaps={'always'}
        >
          <ChatLog uid={String(receiverId)} messages={filteredMessages} />
        </ScrollView>
      </KeyboardAwareScrollView>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          marginHorizontal: 20,
          paddingLeft: 20,
          borderRadius: 20,
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <Box
          alignItems="center"
          w="100%"
          style={{
            borderColor: 'white',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <TextArea
            value={currentMessageContent}
            placeholder="Enter a message here"
            color={'red'}
            w="80%"
            h="auto"
            onChangeText={(text) => setCurrentMessageContent(text)}
            _light={{
              placeholderTextColor: 'trueGray.500',
              bg: 'white',
              borderColor: 'black',
              borderWidth: 0,
              fontSize: 16,
              borderRadius: 20,
              _hover: {
                bg: 'white',
              },
              _focus: {
                bg: 'white',
                borderColor: 'blue.200',
              },
            }}
            autoCompleteType={undefined}
          />
          {showSendButton ? (
            <TouchableOpacity onPress={onSend}>
              <Text className="text-[#4c8ab9] font-medium text-lg">Send</Text>
            </TouchableOpacity>
          ) : null}
        </Box>
      </View>
    </>
  )
}
