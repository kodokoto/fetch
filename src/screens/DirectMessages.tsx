import { View, Text, Keyboard, ScrollView, Button, TouchableOpacity } from 'react-native'
import {Box, TextArea} from "native-base";
import React, { useEffect, useState, useRef } from 'react'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ChatLog from '../components/ChatLog';
import 'react-native-get-random-values';
import uuid from 'react-native-uuid';

export default function DirectMessages({ route, navigation }) {
    const { username, mostRecentMessage } = route.params;
    const [showSendButton, setShowSendButton] = useState(false);
    const [currentMessageContent, setCurrentMessageContent] = useState("");
    const [chatLogs, setChatLogs]: any[] = useState([]);
    const scrollViewRef = useRef();

    

    useEffect(() => {
        const chatLogData = require("../assets/exampleMessagesData.json");
        console.log(chatLogData[0].author);
        console.log(Date.now());
        let sortedChatLogs = chatLogData.sort((a,b) => (a.timestamp > b.timestamp) ? 1 : -1);
        setChatLogs(sortedChatLogs);
        navigation.setParams({ headerTitle: username });
        const keyboardShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
              this.scrollView.scrollToEnd({animated: true});
          }
      );
        const keyboardHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                return
            }
        );

        return () => {
          keyboardShowListener.remove();
          keyboardHideListener.remove();
        }
    }, []);
    useEffect(() => {
      if(currentMessageContent == ""){
        setShowSendButton(false);
      } else {
        setShowSendButton(true);
      }
    }, [currentMessageContent]);

    const onSend = () => {
      setChatLogs([...chatLogs, {"id": uuid.v4(), "content": currentMessageContent, "timestamp": Date.now(), author: "Adam Power"}]);
      setCurrentMessageContent("");
    }
  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'} contentContainerStyle={{
      display: 'flex',
      justifyContent: 'space-between',
      flex: 1,
      paddingBottom: 30
    }}>
      <ScrollView ref={ref => {this.scrollView = ref}}
      
      onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})} keyboardShouldPersistTaps={'always'}>
      <ChatLog chatLogs={chatLogs} />
      </ScrollView>
      <View style={{
        borderWidth: 1,
        borderColor: 'gray',
        marginHorizontal: 20,
        paddingLeft: 20,
        borderRadius: 20,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
      }}>
        <Box alignItems="center" w="100%" style={{
          borderColor: 'white',
          display: 'flex',
          flexDirection: 'row'
        }} >
          <TextArea value={currentMessageContent} onChange={e => setCurrentMessageContent(e.currentTarget.value)} placeholder="Enter a message here" color={"red"} w="80%" h="auto"             onChangeText={text => setCurrentMessageContent(text)}
            _light={{
            placeholderTextColor: "trueGray.500",
            bg: 'white',
            borderColor: 'black',
            borderWidth: 0,
            fontSize: 16,
            borderRadius: 20,
            _hover: {
              bg: "white"
            },
            _focus: {
              bg: "white",
              borderColor: 'blue.200'
            }
          }} />
          {/* <Button title="Send" color="#ccc"></Button> */}
          {showSendButton ? (<TouchableOpacity onPress={onSend}>
            <Text style={{
              color: '#4c8ab9',
              fontWeight: 500,
              fontSize: 18
            }}>Send</Text>
          </TouchableOpacity>) : null}
        </Box>
      </View>
    </KeyboardAwareScrollView>
  )
}