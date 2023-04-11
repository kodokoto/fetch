import React from 'react'
import { View, Text, Image } from 'react-native'
import { Menu, Pressable, ThreeDotsIcon, Button } from 'native-base'
import { Ionicons } from '@expo/vector-icons';
import { EditableDisplayCard } from './DisplayCardList';
import { Service, Animal } from '@prisma/client'
import { Entypo, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import { parseServiceType, titleCase } from '../utils/helpers';

type ServiceWithPetType = Service & { petTypes: Animal[] }

function serviceTypeToIcon(serviceType: string) {
  switch(serviceType) {
    case "WALK":
      return <Foundation name="guide-dog" size={28} color="black" />
    case "PET_CARE":
      return <Ionicons name="logo-octocat" size={28} color="black" />
    case "HOUSE_SITTING":
      return <Entypo name="home" size={28} color="black" /> 
  }
}

function petTypeToIcon(petType: string) {
  switch(petType) {
    case "DOG":
      return <MaterialCommunityIcons name="dog" size={28} color="black" />
    case "CAT":
      return <MaterialCommunityIcons name="cat" size={28} color="black" />
    case "OTHER":
      return <Ionicons name="ios-paw" size={24} color="black" />
  }
}

export default function ServiceDisplayCard({ value, editable = false, onEdit, onDelete }: EditableDisplayCard<ServiceWithPetType>) {

    return (
      <View className='flex-row h-16 mb-2'>
        <View className='flex-row items-center pl-4 gap-x-8  w-[100%]'>
            <View className='flex-col justify-between items-center '>
                {serviceTypeToIcon(value.type)}
                <Text className='text-sm'>{parseServiceType(value.type)}</Text>
            </View>
            <View className='flex-col justify-between items-center'>
                <Text className='text-lg font-semibold'>£{value.price}</Text>
                <Text className='text-sm'>p/h</Text>
            </View>
            <View className='flex-col justify-between items-center'>
                <Text className='text-lg font-semibold m-0'>{value.duration}</Text>
                <Text className='text-sm'>Minutes</Text>
            </View>
            <View className='flex-col justify-between items-center w-9'>
                <View className='flex-row'>
                    {value.petTypes.map((petTpe, i) => {
                        return (<View key={i} className='flex-row items-center'>
                            {petTypeToIcon(petTpe.type)}
                        </View>)
                    })}
                </View>
                <Text className='text-sm'>Pets</Text>
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
                            <Ionicons name="ios-cog-outline" size={16} color="black" />
                            <Text className='text-black'>Edit</Text>
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
