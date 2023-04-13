import React, { ComponentType } from 'react'
import { View, Text, Button } from 'native-base'
import { titleCase } from 'app/utils/helpers'
import { FontAwesome5 } from '@expo/vector-icons'

type AvailablepetType = {
  DOG: boolean
  CAT: boolean
  OTHER: boolean
}

export default function PetTypeSelect({
  value,
  onChange,
  toggle = false,
}: {
  value: AvailablepetType
  onChange: (value: AvailablepetType) => void
  toggle?: boolean
}) {
  console.log('current value: ', value)

  const handleChange = !toggle
    ? (key, newValue) => {
        onChange({
          ...value,
          [key]: newValue,
        })
      }
    : (key, newValue) => {
        const newValues = {
          DOG: false,
          CAT: false,
          OTHER: false,
          [key]: newValue,
        }
        onChange(newValues)
      }

  return (
    <View className="flex-row justify-center divide-x-8 ">
      <AnimalSelectButton animal="DOG" value={value.DOG} onChange={handleChange} Icon={FontAwesome5} />
      <AnimalSelectButton animal="CAT" value={value.CAT} onChange={handleChange} Icon={FontAwesome5} />
      <AnimalSelectButton animal="OTHER" value={value.OTHER} onChange={handleChange} />
    </View>
  )
}

function AnimalSelectButton({
  animal,
  value,
  onChange,
  Icon,
}: {
  animal: string
  value: boolean
  onChange: (animal: string, value: boolean) => void
  Icon?: ComponentType<any>
}) {
  return (
    <Button
      className={`flex-row w-24 h-12 mx-3 justify-center items-center text-center bg-transparent border-2 rounded-[10px]`}
      onPress={() => onChange(animal, !value)}
      style={{
        borderColor: value ? '#3b82f6' : '#C5C5C5',
      }}
    >
      <View className="flex-row items-center">
        {Icon && (
          <View className="mr-2">
            <Icon name={animal.toLowerCase()} size={16} color={value ? '#3b82f6' : '#C5C5C5'} />
          </View>
        )}
        <Text>{titleCase(animal)}</Text>
      </View>
    </Button>
  )
}
