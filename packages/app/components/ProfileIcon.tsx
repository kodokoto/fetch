import React from 'react'
import { useRouter } from 'expo-router'
import { Box, Menu, Avatar, Pressable } from 'native-base'

type User = {
  iconUrl: string
}

export default function ProfileIcon(props: User) {
  const router = useRouter()

  return (
    <Box className="items-end">
      <Menu
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <Avatar className="w-8 h-8 mr-2 ml-14 mt-10 mb-4" source={{ uri: props.iconUrl }} />
            </Pressable>
          )
        }}
      >
        <Menu.Item onPress={() => router.push('/editprofile')}>Edit Profile</Menu.Item>
        <Menu.Item onPress={() => router.push('/settings')}>Settings</Menu.Item>
        <Menu.Item>Help</Menu.Item>
      </Menu>
    </Box>
  )
}
