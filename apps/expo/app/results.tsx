import { View, Text } from 'react-native'
import React from 'react'
import SearchResults from 'app/components/SearchResults'
import SearchResult from 'app/components/SearchResult'
import { api } from 'app/utils/trpc'
import { useSearchParams } from 'expo-router'

export default function Results() {
  const { date, service, availability, maxPrice, dateTime } = useSearchParams()
  console.log('max: ' + maxPrice)

  const searchParamsObject = {
    dateTime: String(dateTime),
    service: String(service),
    maxPrice: Number(maxPrice),
    availability: String(availability),
    date: String(date),
  }

  console.log('Search Params: ' + JSON.stringify(searchParamsObject))
  const { data: sitters } = api.sitter.bySearchParams.useQuery(searchParamsObject)

  return (
    <View className="flex gap-8">
      <Text className="font-bold text-xl ml-2">Search Results</Text>
      {sitters ? (
        sitters.map((searchResult) => {
          return <SearchResult searchResult={searchResult} key={searchResult.id} />
        })
      ) : (
        <Text>No Results</Text>
      )}
    </View>
    //   {searchResults ? searchResults.map(searchResult => {
    //     return (<SearchResult searchResult={searchResult} key={searchResult.id} />)
    //   }) : null}
    //   {/* <Text>{date}</Text>
    //         <Text>{service}</Text>
    //         <Text>{recurring}</Text>
    //         <Text>{maxPrice}</Text> */}
    //   {/* <SearchResults {...{date, service, frequency, maxPrice}} /> */}
    // </View>
  )
}
