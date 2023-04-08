import { View, Text } from 'react-native'
import React from 'react'
import SearchResults from 'app/components/SearchResults'
import SearchResult from 'app/components/SearchResult'
import { api } from 'app/utils/trpc'
import { useSearchParams } from 'expo-router'

export default function Results() {
  const { date, service, frequency, proximity } = useSearchParams()
  const searchParamsObject = {
    service,
    proximity,
    frequency,
    date
  }

  console.log("Service: " + service);

  let searchResults = api.sitter.bySearchParams.useQuery(searchParamsObject,{enabled: !!searchParamsObject}).data;
  console.log("Results: " + JSON.stringify(searchResults));
  console.log("Services Results: " + JSON.stringify(api.service.byService.useQuery(service).data));

  return (
    <View>
      {searchResults ? searchResults.map(searchResult => {
        return (<SearchResult searchResult={searchResult} key={searchResult.id} />)
      }) : null}
      {/* <Text>{date}</Text>
            <Text>{service}</Text>
            <Text>{recurring}</Text>
            <Text>{proximity}</Text> */}
      {/* <SearchResults {...{date, service, frequency, proximity}} /> */}
    </View>
  )
}
