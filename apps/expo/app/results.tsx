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
  

  const { data: services } = api.service.bySearchParams.useQuery(searchParamsObject)

  return (
    <View className="flex gap-8">
      <Text className="font-bold text-xl ml-2">Search Results</Text>
      {
      services ? (
        services.map((service) => {
          return <SitterDescriptionCard service={service} searchParams={{
            serviceType: String(serviceType),
            day: String(day),
            timeOfDay: String(timeOfDay),
          }} key={service.id} />
        })
      ) : (
        <Text>No Results</Text>
      )}
    </View>
  )
}
