import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import ChatMessage from './ChatMessage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function ChatLog(props) {
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}>
      {props.chatLogs.map((chatLog, index) => {
        let datesAreEqual = false;
        if(index > 0){
          let previousMessageTimestamp = new Date(props.chatLogs[index-1].timestamp);
          let currentMessageTimestamp = new Date(props.chatLogs[index].timestamp);
          if(previousMessageTimestamp.getDate() == currentMessageTimestamp.getDate() 
            && previousMessageTimestamp.getMonth() == currentMessageTimestamp.getMonth()
            && previousMessageTimestamp.getFullYear() == currentMessageTimestamp.getFullYear()){
              datesAreEqual = true;
            }
        }
        return (
          (
            <ChatMessage key={chatLog.id} showDatestamp={datesAreEqual} day={weekday[new Date(chatLog.timestamp).getDay()]} timestamp={chatLog.timestamp} messageContent={chatLog.content} messageByAuthor={chatLog.author == "Adam Power" ? true : false} />
          )
        )
      })}
    </KeyboardAwareScrollView>
  )
}
