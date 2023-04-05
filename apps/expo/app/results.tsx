import { View, Text } from 'react-native'
import React from 'react'
import SearchResults from 'app/components/SearchResults'
import { useSearchParams } from 'expo-router'

export default function Results() {
  const {date, service, frequency, proximity} = useSearchParams();

  return (
        <View>
            <Text>Results</Text>
            {/* <Text>{date}</Text>
            <Text>{service}</Text>
            <Text>{recurring}</Text>
            <Text>{proximity}</Text> */}
          {/* <SearchResults {...{date, service, frequency, proximity}} /> */}
        </View> 
  )
}
