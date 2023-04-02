import { View, TouchableOpacity, Text, Image, ImageBackground, TextInput } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import ChatContact from '../components/ChatContact';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/bottom-tabs";
import { Flex } from 'native-base'
import { border } from 'native-base/lib/typescript/theme/styled-system'

export default function Chat({ navigation }) {
  const [chatLogs, setChatLogs] = useState(null);
  const contacts = useRef([]);
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("../assets/Bifford.png");

  let chatLogComponents = null;

  useEffect(() => {
    const chatLogData = require("../assets/exampleChatData.json");
    setChatLogs(chatLogData);
    contacts.current = chatLogs ? chatLogs : chatLogData;
  })

  let filterChatLogs = (filterWord) => {
    let filteredChatLogs = chatLogs.filter(chatLog => {
      return chatLog.username.includes(filterWord);
    });   
    setChatLogs(filteredChatLogs);
    contacts.current = filteredChatLogs;
  }
  return (
    <View>
      <View style={{
          backgroundColor: '#ede9e8',
          marginLeft: 15,
          marginRight: 15,
          paddingLeft: 10,
          height: 40,
          borderRadius: 20,
          marginTop: 20,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Ionicons name={"ios-search"} size={20} color={"gray"} style={{
          marginTop: 20,
          height: 40
        }} />
        <TextInput placeholder='Search...' style={{
          borderWidth: 0,
          height: 40,
          marginLeft: 10,
          flex: 1
        }} onChangeText={(e) => (filterChatLogs(e))} />
      </View>
      <Text className="text-blue-500" style={{
        fontSize: 20,
        marginLeft: 15,
        marginTop: 20
      }}>Messages</Text>  
      {chatLogs ? contacts.current.map(chatLog => (
      <ChatContact username={chatLog.username} mostRecentMessage={chatLog.mostRecentMessage} key={chatLog.mostRecentMessage} imageSource={{uri: chatLog.profilePictureURL}} navigation={navigation} />
    )) : null}
      {/* <ChatContact username={"Bifford Bifford"} mostRecentMessage={"Some Random Message."} imageSource={require('../assets/favicon.png')} navigation={navigation} />
      <ChatContact username={"Cree Pinonce"} mostRecentMessage={"Hello There my Friend."} imageSource={require('../assets/html.png')} navigation={navigation} /> */}
    </View>
  )
}