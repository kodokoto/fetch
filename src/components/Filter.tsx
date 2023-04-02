import React from "react";
import { Box, Select, FormControl, Text, Button, Input, HStack, CheckIcon, Slider, NativeBaseProvider } from "native-base";
import { useNavigation } from '@react-navigation/native';

const Proximity = () => {
  const [onChangeValue, setOnChangeValue] = React.useState(0);
  return <Box alignItems="center" w="100%">
    <HStack>
      <Slider w="3/4" maxW="300" defaultValue={0} minValue={0} maxValue={100} accessibilityLabel="hello world" step={10}
      onChange={v => { setOnChangeValue(Math.floor(v)); }}>
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
      <Text textAlign="center">      {onChangeValue} Miles</Text>
    </HStack> 
  </Box>;
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
const Recurring = () => {
  const [service, setService] = React.useState("");
  return <Box maxW="full">
        <Select selectedValue={service} minWidth="full" accessibilityLabel="Choose availability" placeholder="Choose availability" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={itemValue => setService(itemValue)}>
          <Select.Item label="Yes" value="yes" />
          <Select.Item label="No" value="no" />
        </Select>
      </Box>
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
          <Recurring />
          <FormControl.Label _text={{ bold: true }}>Proximity:</FormControl.Label>
          <Proximity /> 
          <Button my={5} onPress={handlePress}>Submit</Button>
        </Box>
        
      </NativeBaseProvider>
  
    )
  }