import { View } from 'react-native'
import React from 'react'
import ReportForm from 'app/components/ReportForm'
import { useSearchParams } from 'expo-router'

export default function Search() {
  const { sitterId } = useSearchParams()
  return (
    <View className="h-96">
      <ReportForm sitterId={Number(sitterId)} />
    </View>
  )
}
