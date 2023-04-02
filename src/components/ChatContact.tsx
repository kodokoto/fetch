import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'

export default function ChatContact(props) {
    // let propsImageSource: string = props.imageSource;
    // let imageSource = require(propsImageSource);
    // console.log("Image Source: " + String(props.imageSource));
    
  return (
    <View>
      <TouchableOpacity onPress={() => props.navigation.navigate('DirectMessages', {username: props.username, mostRecentMessage: props.mostRecentMessage})} style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20
      }}>
        <View style={{
          height: 60,
          width: 60,
          marginLeft: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ImageBackground resizeMode="contain" source={props.imageSource} style={{
          height: 50,
          width: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          }} />
        </View>
        <View style={{
          height: 60,
          display: 'flex',
          justifyContent: 'center',
        }}>
            <Text style={{
            marginLeft: 15,
            fontWeight: 600,
            fontSize: 18,
          }}>{props.username}</Text>
            <Text style={{
            marginLeft: 15
          }}>{props.mostRecentMessage}</Text>
        </View>
      </TouchableOpacity> 
    </View>
  )
}