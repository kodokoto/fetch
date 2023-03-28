import { View, Text } from 'react-native'
import React from "react";
import { Box, Select, Button, Input, CheckIcon, Center, Radio, Heading,  NativeBaseProvider } from "native-base";
import SearchResults from '../screens/SearchResults';
const Rating = () => {
  const [service, setService] = React.useState("");
  return <Center>
      <Box maxW="300">
        <Select selectedValue={service} minWidth="100" accessibilityLabel="Choose rating" placeholder="Rating" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={itemValue => setService(itemValue)}>
          <Select.Item label="1" value="one" />
          <Select.Item label="2" value="two" />
          <Select.Item label="3" value="three" />
          <Select.Item label="4" value="four" />
          <Select.Item label="5" value="five" />
        </Select>
      </Box>
    </Center>;
};
const Service = () => {
  const [service, setService] = React.useState("");
  return <Center>
      <Box maxW="300">
        <Select selectedValue={service} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={itemValue => setService(itemValue)}>
          <Select.Item label="Walking" value="walking" />
          <Select.Item label="Pet care" value="petcare" />
          <Select.Item label="House sitting" value="hs" />
        </Select>
      </Box>
    </Center>;
};

const RadioButton = () => {
  const [value, setValue] = React.useState("Yes");
  return <Radio.Group name="radioButtons" accessibilityLabel="Available for recurring visit" value={value} onChange={nextValue => {
    setValue(nextValue);
  }}>  
      <Radio value="Yes" my={1}>
        Yes
      </Radio>
      <Radio value="No" my={1}>
        No
      </Radio>
    </Radio.Group>;
};

  export default function Filter() {
    return (
      <NativeBaseProvider>
        <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
          <Heading>Time available:</Heading>
          <Input mx="3" placeholder="Start time" w="150" />
          <Heading>to</Heading>
          <Input mx="3" placeholder="End time" w="150" />
          <Heading>Service</Heading>
          <Service />
          <Heading>Open for recurring visit?</Heading>
          <RadioButton />
          <Heading>User rating:</Heading>
          <Rating />
          <Heading>Proximity:</Heading>
          <Input mx="3" placeholder="Distance" w="100" />
          <Button onPress={() => <SearchResults />}>Submit</Button>
        </Box>
      </NativeBaseProvider>
  
    )
  }