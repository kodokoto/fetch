import React from 'react'
import { View, Text, Button } from 'native-base'

type AvailableDays = {
  MONDAY: boolean
  TUESDAY: boolean
  WEDNESDAY: boolean
  THURSDAY: boolean
  FRIDAY: boolean
  SATURDAY: boolean
  SUNDAY: boolean
}

function prettifyDay(day: string) {
  return day[0] + day[1].toLowerCase()
}

function DaySelectButton({
  day,
  value,
  onChange,
  roundedLeft = false,
  roundedRight = false,
}: {
  day: string
  value: boolean
  onChange: (day: string, value: boolean) => void
  roundedLeft?: boolean
  roundedRight?: boolean
}) {
  const className = 'roounded-l-full'
  return (
    <Button
      className={`flex-row w-12 h-12 justify-center items-center text-center bg-transparent border-2 rounded-none ${className}`}
      onPress={() => onChange(day, !value)}
      style={{
        borderColor: value ? '#3b82f6' : '#C5C5C5',
        borderTopLeftRadius: roundedLeft ? 10 : 0,
        borderBottomLeftRadius: roundedLeft ? 10 : 0,
        borderTopRightRadius: roundedRight ? 10 : 0,
        borderBottomRightRadius: roundedRight ? 10 : 0,
      }}
    >
      <Text>{prettifyDay(day)}</Text>
    </Button>
  )
}

export default function AvailableDaySelect({
  value,
  onChange,
}: {
  value: AvailableDays
  onChange: (value: AvailableDays) => void
}) {
  const handleDayChange = (day, newValue) => {
    onChange({
      ...value,
      [day]: newValue,
    })
  }

  return (
    <View className="flex-row justify-center divide-x-8 ">
      <DaySelectButton roundedLeft day="MONDAY" value={value.MONDAY} onChange={handleDayChange} />
      <DaySelectButton day="TUESDAY" value={value.TUESDAY} onChange={handleDayChange} />
      <DaySelectButton day="WEDNESDAY" value={value.WEDNESDAY} onChange={handleDayChange} />
      <DaySelectButton day="THURSDAY" value={value.THURSDAY} onChange={handleDayChange} />
      <DaySelectButton day="FRIDAY" value={value.FRIDAY} onChange={handleDayChange} />
      <DaySelectButton day="SATURDAY" value={value.SATURDAY} onChange={handleDayChange} />
      <DaySelectButton roundedRight day="SUNDAY" value={value.SUNDAY} onChange={handleDayChange} />
    </View>
  )
}
