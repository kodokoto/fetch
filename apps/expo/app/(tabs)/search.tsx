import { View, Text } from 'react-native'
import React from 'react'
import Filter from 'app/components/Filter'
import Report from 'app/components/Report'

export default function Search() {
  return (
    <View className="h-96">
      {/* Testing to see how report shows gonna remove later uwu */}
      <Report />
      <Filter />
    </View>
  )
}
