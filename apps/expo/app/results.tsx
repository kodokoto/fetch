import { View, Text } from 'react-native'
import React from 'react'
import SitterDescriptionCard from 'app/components/SitterDescriptionCard'
import { api } from 'app/utils/trpc'
import { useSearchParams } from 'expo-router'

export default function Results() {
  const { serviceType, day, timeOfDay, maxPrice } = useSearchParams()
  console.log('max: ' + maxPrice)

  // const searchParamasAtom = useAtom(searchParamsAtom)

  const searchParamsObject = {
    serviceType: String(serviceType),
    day: String(day),
    timeOfDay: String(timeOfDay),
    maxPrice: Number(maxPrice),
  }

  console.log("Search Params: " + JSON.stringify(searchParamsObject));
  

  const { data: sitters } = api.sitter.bySearchParams.useQuery(searchParamsObject)

  return (
    <View className='m-8'>
      <Text className="font-bold text-xl ml-2 mb-4">Search Results</Text>
      <View>
        {
        sitters ? (
          sitters.map((sitter) => {
            return <SitterDescriptionCard sitter={sitter} searchParams={{
              serviceType: String(serviceType),
              day: String(day),
              timeOfDay: String(timeOfDay),
            }} key={sitter.id} />
          })
        ) : (
          <Text>No Results</Text>
        )}
      </View>
    </View>
  )
}
