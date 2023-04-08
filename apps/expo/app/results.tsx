import { View, Text } from 'react-native'
import React from 'react'
import SearchResults from 'app/components/SearchResults'
import SearchResult from 'app/components/SearchResult'
import { api } from 'app/utils/trpc'
import { useSearchParams } from 'expo-router'

export default function Results() {
  const { date, service, availability, maxPrice } = useSearchParams()
  const searchParamsObject = {
    service: String(service),
    maxPrice: Number(maxPrice),
    availability: String(availability),
    date: String(date),
  }

  const { data: sitters } = api.sitter.bySearchParams.useQuery(searchParamsObject)

  // console.log("Service: " + service);

  // const searchResults = api.sitter.bySearchParams.useQuery(searchParamsObject,{enabled: !!searchParamsObject}).data;
  // console.log("Results: " + JSON.stringify(searchResults));
  // console.log("Services Results: " + JSON.stringify(api.service.byService.useQuery(service).data));
  return (
    <View className='flex gap-8'>
      {
        sitters ? sitters.map(searchResult => {
          return (<SearchResult searchResult={searchResult} key={searchResult.id} />)
        }) : null
      }
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
