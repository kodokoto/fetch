import React from 'react'
import { Box, Select, FormControl, Text, Button, Input, HStack, CheckIcon, Slider, VStack } from 'native-base'
import { TouchableOpacity, Platform } from 'react-native'
import { useRouter } from 'expo-router'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { TimeOfDay, Day, ServiceType } from '@prisma/client'

export type FilterSearchParams = {
  serviceType: string
  day: Day
  timeOfDay: TimeOfDay
  maxPrice: number
}

export default function Filter() {
  const router = useRouter()

  const handleSubmit = (data: FilterSearchParams) => {
    console.log("Dataaaaaa: " + JSON.stringify(data));
    
    router.push({
      pathname: '/results',
      params: {
        day: data.day,
        serviceType: data.serviceType,
        timeOfDay: data.timeOfDay,
        maxPrice: data.maxPrice,
      },
    })
  }

  const [date, setDate] = React.useState(new Date())
  const [showDate, setShowDate] = React.useState(false)
  const [serviceType, setServiceType] = React.useState<ServiceType>('WALK')
  const [timeOfDay, setTimeOfDay] = React.useState<TimeOfDay>('ANY')
  const [maxPrice, setMaxPrice] = React.useState(0)

  const onConfirmDate = (date: Date) => {
    setShowDate(false)
    setDate(date)
  }

  return (
    <Box>
      {/* Display date (not time)*/}
      <FormControl isRequired>
        <VStack space={4} className="mt-8 mx-8">
          <FormControl.Label className="text-bold">Day availabile:</FormControl.Label>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              console.log(123);
              setShowDate(true)
            }}
          >
            <Input
              _ios={{
                onTouchStart: () => {
                  setShowDate(true)
                },
              }}
              onTouchStart={() => setShowDate(true)}
              placeholder="Select day"
              editable={false}
              value={date.toLocaleDateString()}
            />
          </TouchableOpacity>
          <FormControl.Label _text={{ bold: true }}>Service:</FormControl.Label>
          <Box maxW="full">
            <Select
              selectedValue={serviceType}
              minWidth="full"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setServiceType(itemValue as ServiceType)}
            >
              <Select.Item label="Walking" value="WALK" />
              <Select.Item label="Pet care" value="PET_CARE" />
              <Select.Item label="House sitting" value="HOUSE_SITTING" />
            </Select>
          </Box>
          <FormControl.Label _text={{ bold: true }}>Time Available:</FormControl.Label>
          <Box maxW="full">
            <Select
              selectedValue={timeOfDay}
              minWidth="full"
              accessibilityLabel="Choose time"
              placeholder="Choose time"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setTimeOfDay(itemValue as TimeOfDay)}
            >
              <Select.Item label="6am-11am" value="MORNING" />
              <Select.Item label="11am-3pm" value="AFTERNOON" />
              <Select.Item label="3pm-10pm" value="EVENING" />
            </Select>
          </Box>
          <FormControl.Label _text={{ bold: true }}>Maximum Price:</FormControl.Label>
          <Box alignItems="center" w="100%">
            <HStack>
              <Slider
                defaultValue={0}
                minValue={0}
                maxValue={100}
                accessibilityLabel="Max Price"
                step={10}
                onChange={(v) => {
                  setMaxPrice(Math.floor(v))
                }}
                className="w-3/4 max-w-300"
              >
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
              <Text className="text-center ml-1">£{maxPrice}</Text>
            </HStack>
          </Box>
        </VStack>
        <DateTimePickerModal
          isVisible={showDate}
          mode="date"
          onConfirm={onConfirmDate}
          onCancel={() => setShowDate(false)}
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
        />
        <Button
          className="w-[300px] m-auto mt-10"
          onPress={() =>
            handleSubmit({
              day: date
                .toLocaleDateString('en-us', { weekday: 'long' })
                .replace(/[^a-z]/gi, '')
                .toUpperCase() as Day,
              timeOfDay,
              serviceType,
              maxPrice,
            })
          }
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  )
}
