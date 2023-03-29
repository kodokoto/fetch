import { View, Text } from 'react-native'
import React from 'react'
import { Avatar } from 'native-base'

type User = {
  iconUrl: string
}

export default function ProfileIcon(props: User) {
  return (
    <Avatar source={{uri: props.iconUrl}}></Avatar>
  );
}