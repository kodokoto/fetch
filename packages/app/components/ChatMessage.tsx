import { View, Text } from 'react-native'
import React from 'react'

export default function ChatMessage(props) {
  const messageTimestamp = new Date(props.timestamp)
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return (
    <View
      style={{
        display: 'flex',
      }}
    >
      {!props.showDatestamp ? (
        <Text className="text-center text-gray-500 text-sm font-medium">
          {props.day} {messageTimestamp.getDate()} {month[messageTimestamp.getMonth()]} {messageTimestamp.getFullYear()}
        </Text>
      ) : null}
      {props.messageByAuthor ? (
        <View className="max-w-[300px] w-auto rounded-2xl mr-4 bg-green-500 p-4 self-end mt-4">
          <Text>
            {props.messageContent ? props.messageContent : null}
            <Text className="flex align-self-end text-right text-gray-500 text-sm font-medium">
              {'\n'}
              {messageTimestamp.getHours()}:
              {(messageTimestamp.getMinutes() < 10 ? '0' : '') + messageTimestamp.getMinutes().toLocaleString()}
            </Text>
          </Text>
        </View>
      ) : (
        <Text className="max-w-[300px] w-auto rounded-2xl ml-4 bg-white p-4 self-start mt-4">
          {props.messageContent ? props.messageContent : null}
          <Text className="flex align-self-end text-right text-gray-500 text-sm font-medium">
            {'\n'}
            {messageTimestamp.getHours()}:
            {(messageTimestamp.getMinutes() < 10 ? '0' : '') + messageTimestamp.getMinutes().toLocaleString()}
          </Text>
        </Text>
      )}
    </View>
  )
}
