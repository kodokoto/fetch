import React from 'react'
import {
  Box,
  Select,
  FormControl,
  Text,
  Button,
  Input,
  HStack,
  CheckIcon,
  Slider,
  NativeBaseProvider,
  VStack,
} from 'native-base'
import { useRouter } from 'expo-router'
import DateTime from '@react-native-community/datetimepicker'

export type FilterSearchParams = {
  date: string
  service: string
  frequency: string
  proximity: number
}

export default function Filter() {
  const router = useRouter()

  const handleSubmit = (data: FilterSearchParams) => {
    router.push({
      pathname: '/results',
      params: {
        date: data.date,
        service: data.service,
        frequency: data.frequency,
        proximity: data.proximity,
      },
    })
  }

  const [date, setDate] = React.useState(new Date())
  const [showDate, setShowDate] = React.useState(false)
  const [service, setService] = React.useState('')
  const [frequency, setfrequency] = React.useState('')
  const [proximity, setProximity] = React.useState(0)

  const onConfirmDate = (date: Date) => {
    setDate(date)
    setShowDate(false)
  }

  return (
    <Box>
      {/* Display date (not time)*/}
      <FormControl isRequired>
        <VStack space={4} className="mt-8 mx-8">
          <FormControl.Label className="text-bold">Time availabile:</FormControl.Label>
          <Input
            placeholder="Select day"
            keyboardType="numeric"
            onPressIn={() => {
              setShowDate(true)
            }}
            value={date.toLocaleDateString()}
          />
          <FormControl.Label _text={{ bold: true }}>Service:</FormControl.Label>
          <Box maxW="full">
            <Select
              selectedValue={service}
              minWidth="full"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setService(itemValue)}
            >
              <Select.Item label="Walking" value="walking" />
              <Select.Item label="Pet care" value="petcare" />
              <Select.Item label="House sitting" value="hs" />
            </Select>
          </Box>
          <FormControl.Label _text={{ bold: true }}>Open for frequency visit:</FormControl.Label>
          <Box maxW="full">
            <Select
              selectedValue={frequency}
              minWidth="full"
              accessibilityLabel="Choose availability"
              placeholder="Choose availability"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setfrequency(itemValue)}
            >
              <Select.Item label="Yes" value="yes" />
              <Select.Item label="No" value="no" />
            </Select>
          </Box>
          <FormControl.Label _text={{ bold: true }}>Proximity:</FormControl.Label>
          <Box alignItems="center" w="100%">
            <HStack>
              <Slider
                defaultValue={0}
                minValue={0}
                maxValue={100}
                accessibilityLabel="distance"
                step={10}
                onChange={(v) => {
                  setProximity(Math.floor(v))
                }}
                className="w-3/4 max-w-300"
              >
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
              <Text className="text-center ml-1">{proximity} Miles</Text>
            </HStack>
          </Box>
        </VStack>
        <Button
          className="w-[300px] m-auto mt-10"
          onPress={() => handleSubmit({ date: date.toLocaleDateString(), frequency, service, proximity })}
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  )
}
