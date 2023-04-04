import { View, Text } from 'react-native'
import React from 'react'

export default function ChatMessage(props) {
  let messageTimestamp = new Date(props.timestamp);
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return (
    <View style={{
      display: "flex"
    }}>
      {!props.showDatestamp ? (
        <Text style={{
          alignSelf: 'center',
          backgroundColor: 'white',
          width: 250,
          textAlign: 'center',
          marginTop: 20,
          padding: 10,
          borderRadius: 30
        }}>{props.day} {messageTimestamp.getDate()} {month[messageTimestamp.getMonth()]} {messageTimestamp.getFullYear()}</Text>
      ) : null}
      {props.messageByAuthor ? (
        <View style={{
          maxWidth: 300,
          width: 'auto',
          borderRadius: 20,
          marginRight: 20,
          backgroundColor: '#ccc',
          padding: 10,
          alignSelf: 'flex-end',
          marginTop: 20
        }}>
          <Text>{props.messageContent ? props.messageContent : null}
          <Text style={{
            display: 'flex',
            alignSelf: 'flex-end',
            textAlign: 'right',
            fontSize: 12,
            color: 'white',
            margin: 0,
            fontWeight: 500
          }}>{"\n"}{messageTimestamp.getHours()}:{(messageTimestamp.getMinutes()<10?'0':'') + messageTimestamp.getMinutes().toLocaleString()}</Text>
          </Text>
        </View>
      ) : <Text style={{
        maxWidth: 300,
        width: 'auto',
        borderRadius: 20,
        marginLeft: 20,
        backgroundColor: 'white',
        padding: 10,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#ccc',
        marginTop: 20
      }}>{props.messageContent ? props.messageContent : null}
      <Text style={{
            display: 'flex',
            alignSelf: 'flex-end',
            textAlign: 'right',
            fontSize: 12,
            color: 'gray',
            margin: 0,
            fontWeight: 500
          }}>{"\n"}{messageTimestamp.getHours()}:{(messageTimestamp.getMinutes()<10?'0':'') + messageTimestamp.getMinutes().toLocaleString()}</Text>
      </Text>}
    </View>
  )
}
