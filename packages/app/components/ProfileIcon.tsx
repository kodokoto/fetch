import React from 'react'
import { useRouter } from 'expo-router'
import { Box, Menu, Avatar, Pressable } from 'native-base'
import { useClerk, useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { View, Text } from 'react-native'
import { Profile, sessionAtom } from 'app/utils/storage'
import { useAtom } from 'jotai'
import { api } from 'app/utils/trpc'

type User = {
  iconUrl: string
}

export default function ProfileIcon(props: User) {
  const router = useRouter()
  const { signOut } = useClerk()
  const { user, isLoaded } = useUser()
  const [session, setSession] = useAtom(sessionAtom)
  const userId = user?.id
  const { data: ownerProfile } = api.owner.byUserId.useQuery(userId, { enabled: !!userId })
  const { data: sitterProfile } = api.sitter.byUserId.useQuery(userId, { enabled: !!userId })

  const getDefaultValue = () => {
    if (session.currentProfile === Profile.OWNER) {
      return 'Owner'
    } else if (session.currentProfile === Profile.SITTER) {
      return 'Sitter'
    } else {
      return 'Owner'
    }
  }

  const switchProfile = (profile: Profile) => {
    setSession({...session, currentProfile: profile})
  }


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
          <Menu.Item onPress={() => router.push(`/${getDefaultValue().toLowerCase()}/${
            session.currentProfile === 'Owner' ? ownerProfile?.id : sitterProfile?.id
          }`)}>Your Profile</Menu.Item>
          <Menu.Item onPress={() => router.push('Setting')}>Setting</Menu.Item>
          <Menu.Item
            onPress={() => {
              signOut()
            }}
          >
            Sign out
          </Menu.Item>
          <Menu.Item>Help</Menu.Item>
        <Menu.OptionGroup title='Profiles' defaultValue={getDefaultValue()} type='checkbox'>
          {
            ownerProfile != null
            ? <Menu.ItemOption value={'Owner'} onPress={() => {
              switchProfile(Profile.OWNER)
              router.push('/home')
            }}>Owner</Menu.ItemOption>
            : <Menu.Item onPress={() => {
              router.push('/create/owner')
            }}>
            <View className='flex flex-row items-center'>
              <Ionicons name="add-circle-outline" size={14}></Ionicons>
              <Text className='ml-4'>Add Owner</Text>
            </View>
          </Menu.Item>
          }
          {
            sitterProfile != null
            ? <Menu.ItemOption value={'Sitter'} onPress={() => {
              switchProfile(Profile.SITTER)
              router.push('/home')
            }}>Sitter</Menu.ItemOption>
            : <Menu.Item onPress={() => {
              router.push('/create/sitter')
            }}>
            <View className='flex flex-row items-center'>
              <Ionicons name="add-circle-outline" size={14}></Ionicons>
              <Text className='ml-4'>Add Sitter</Text>
            </View>
          </Menu.Item>
          }
        </Menu.OptionGroup>
      </Menu>
    </Box>
  )
}
