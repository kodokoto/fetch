import React from 'react'
import ChatMessage from './ChatMessage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Profile, sessionAtom } from '../utils/storage'
import { useAtom } from 'jotai'

type ChatLogProps = {
  uid: string
  messages: FilteredMessages[]
}

export type FilteredMessages = {
  content: string
  createdAt: Date
  ownerId: string
  sitterId: string
  sender: string
}

export default function ChatLog(props: ChatLogProps) {
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const [session, _] = useAtom(sessionAtom)

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}>
      {props.messages.map((message, index) => {
        let datesAreEqual = false
        if (index > 0) {
          const previousMessageTimestamp = new Date(props.messages[index - 1].createdAt)
          const currentMessageTimestamp = new Date(props.messages[index].createdAt)
          if (
            previousMessageTimestamp.getDate() == currentMessageTimestamp.getDate() &&
            previousMessageTimestamp.getMonth() == currentMessageTimestamp.getMonth() &&
            previousMessageTimestamp.getFullYear() == currentMessageTimestamp.getFullYear()
          ) {
            datesAreEqual = true
          }
        }
        return (
          <ChatMessage
            key={message.createdAt}
            showDatestamp={datesAreEqual}
            day={weekday[new Date(message.createdAt).getDay()]}
            timestamp={message.createdAt}
            messageContent={message.content}
            messageByAuthor={message.sender == session.currentProfile.toUpperCase() ? true : false}
          />
        )
      })}
    </KeyboardAwareScrollView>
  )
}
