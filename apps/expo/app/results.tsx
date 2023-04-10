import { View, Text } from 'react-native'
import React from 'react'
import SearchResults from 'app/components/SearchResults'
import SearchResult from 'app/components/SearchResult'
import { api } from 'app/utils/trpc'
import { useSearchParams } from 'expo-router'

export default function Results() {
  const { date, serviceType, availability, maxPrice } = useSearchParams()
  console.log('max: ' + maxPrice)

  const searchParamsObject = {
    date: String(date),
    service: String(serviceType),
    availability: String(availability),
    maxPrice: Number(maxPrice),
  }

  console.log('Search Params: ' + JSON.stringify(searchParamsObject))
  const { data: sitters } = api.sitter.bySearchParams.useQuery(searchParamsObject)

  console.log("Sitters: " + sitters);

  return (
    <View className="flex gap-8">
      <Text className="font-bold text-xl ml-2">Search Results</Text>
      {
      sitters ? (
        sitters.map((searchResult) => {
          return <SearchResult searchResult={searchResult} key={searchResult.id} />
        })
      ) : (
        <Text>No Results</Text>
      )}
    </View>
  )
}
