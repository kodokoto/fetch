import React from "react";
import { Box, Select, FormControl, Text, Button, Input, HStack, CheckIcon, Radio, NativeBaseProvider } from "native-base";
import { useNavigation } from '@react-navigation/native';

//Rating
const Rating = () => {
  const [service, setService] = React.useState("");
  return <Box maxW="full">
        <Select selectedValue={service} minWidth="full" accessibilityLabel="Choose rating" placeholder="Rating" _selectedItem={{
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
    
};

//Dropdown for service
const Service = () => {
  const [service, setService] = React.useState("");
  return <Box maxW="full">
        <Select selectedValue={service} minWidth="full" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={itemValue => setService(itemValue)}>
          <Select.Item label="Walking" value="walking" />
          <Select.Item label="Pet care" value="petcare" />
          <Select.Item label="House sitting" value="hs" />
        </Select>
      </Box>
    
};

//Open for recurring visit
const RadioButton = () => {
  const [value, setValue] = React.useState("Yes");
  return  <Radio.Group name="radioButtons" accessibilityLabel="Available for recurring visit" value={value} onChange={nextValue => { setValue(nextValue); }}>
    <HStack space={5}>
     <Radio value="Yes" my={1}>Yes</Radio>
      <Radio value="No" my={1}>No</Radio>
     </HStack>
   
       
    </Radio.Group>;
};

  export default function Filter() {
    const navigation = useNavigation();
    //Button handler
    const handlePress = () => {
        navigation.navigate('SearchResults');
    }

    return (
      <NativeBaseProvider>
        <Box flex={1} bg="#fff" p={4}>
          <FormControl.Label _text={{ bold: true }}>Time Available:</FormControl.Label>
          <HStack space={1}>
          <Input ml={0} mx="3" placeholder="Start time" w="150" keyboardType='numeric' />
          <Text my={3}>to</Text>
          <Input mx="3" placeholder="End time" w="150" keyboardType='numeric'/>
          </HStack>
          <FormControl.Label _text={{ bold: true }}>Service:</FormControl.Label>
          <Service />
          <FormControl.Label _text={{ bold: true }}>Open for recurring visit:</FormControl.Label>
          <RadioButton />
          <FormControl.Label _text={{ bold: true }}>User rating:</FormControl.Label>
          <Rating />
          <FormControl.Label _text={{ bold: true }}>Proximity:</FormControl.Label>
          <HStack space={2}>
            <Input my="1" placeholder="Distance" w='300' keyboardType='numeric' />
            <Text my={4}>Miles</Text>
          </HStack>
          
          <Button my={5} onPress={handlePress}>Submit</Button>
        </Box>
      </NativeBaseProvider>
  
    )
  }