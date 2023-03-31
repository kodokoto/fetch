import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Box, Menu, Avatar, Pressable } from 'native-base'

type User = {
  iconUrl: string
}

export default function ProfileIcon(props: User) {
  const navigation = useNavigation();

  return (
    <Box className='items-end'>
      <Menu trigger={triggerProps => {
        return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                  <Avatar className='w-24 h-24 mx-6 mt-6' source={{uri: props.iconUrl}}/>
              </Pressable>;
        }}>
        <Menu.Item onPress={() => navigation.navigate('EditProfile')}>Edit Profile</Menu.Item>
        <Menu.Item onPress={() => navigation.navigate('Setting')}>Setting</Menu.Item>
        <Menu.Item>Help</Menu.Item>
      </Menu>
    </Box>
  );
}