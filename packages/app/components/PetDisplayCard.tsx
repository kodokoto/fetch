import React from 'react'
import { View, Text, Image } from 'react-native'
import { Menu, Pressable, ThreeDotsIcon, Button } from 'native-base'
import { Ionicons, Entypo } from '@expo/vector-icons';
import { EditableDisplayCard } from './DisplayCardList';
import { Pet } from '@prisma/client'

export default function PetDisplayCard({ value, editable = false, onDelete, onEdit }: EditableDisplayCard<Pet>) {

    return (
      <View className='flex-row h-24 justify-between'>
        <View className='flex-row items-center'>
          <View className='flex-col ml-2'>
            <Image
              className='rounded-full w-12 h-12 mr-4'  
              source={{
                uri: value.imageUrl,
              }}
            />
          </View>
          <View className='flex-col justify-center'>
            <Text className='text-lg font-semibold'>{value.name}</Text>
            <Text className='text-sm'>{value.description}</Text>
          </View>
        </View>
        {
          editable && (
             <View className='flex-col m-4 my-auto'>
              <Menu 
                  placement='left'
                  className='mr-4'
                  trigger={triggerProps => {
                      return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                              <Entypo name="dots-three-vertical" size={24} color="gray" />
                            </Pressable>;
                    }}>
                    <Menu.Item onPress={() => {onEdit(value)}}>
                        <Ionicons name="ios-create-outline" size={16} color="blue" />
                        <Text className='text-blue-500'>Edit</Text>
                    </Menu.Item>
                    <Menu.Item onPress={() => {onDelete(value)}}>
                        <Ionicons name="ios-trash-outline" size={16} color="red" />
                        <Text className='text-red-500'>Delete</Text>
                    </Menu.Item>
                </Menu>
            </View>
          )
        }
      </View>
    )
}