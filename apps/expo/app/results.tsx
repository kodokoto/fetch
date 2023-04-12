import { View, Text } from 'react-native'
import React from 'react'
import SitterDescriptionCard from 'app/components/SitterDescriptionCard'
import { api } from 'app/utils/trpc'
import { useSearchParams } from 'expo-router'
import { PetType } from 'db'

export default function Results() {
  const { serviceType, day, timeOfDay, maxPrice, petTypes } = useSearchParams()
  console.log('max: ' + maxPrice)

  // const searchParamasAtom = useAtom(searchParamsAtom)

  const searchParamsObject = {
    serviceType: String(serviceType),
    day: String(day),
    timeOfDay: String(timeOfDay),
    maxPrice: Number(maxPrice),
    petTypes: String(petTypes).split(","),
  }

  console.log("Search Params: " + JSON.stringify(searchParamsObject));
  

  const { data: sitters } = api.sitter.bySearchParams.useQuery(searchParamsObject)

  return (
    <View className="flex gap-8">
      <Text className="font-bold text-xl ml-2">Search Results</Text>
      {
      sitters ? (
        sitters.map((sitter) => {
          return <SitterDescriptionCard sitter={sitter} searchParams={{
            serviceType: String(serviceType),
            day: String(day),
            timeOfDay: String(timeOfDay),
            petTypes: Array(String(petTypes)),
          }} key={sitter.id} />
        })
      ) : (
        <Text>No Results</Text>
      )}
    </View>
  )
}
