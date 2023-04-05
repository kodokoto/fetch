import React from 'react'
import ChatMessage from './ChatMessage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type ChatLogProps = {
  uid: number
  messages: FilteredMessages[]
}

export type FilteredMessages = {
  content: string
  createdAt: Date
  senderId: number
  receiverId: number
}

export default function ChatLog(props: ChatLogProps) {
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
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
            messageByAuthor={message.senderId == props.uid ? true : false}
          />
        )
      })}
    </KeyboardAwareScrollView>
  )
}
