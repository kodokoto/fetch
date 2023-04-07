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
  TextArea,
  NativeBaseProvider,
  VStack
} from 'native-base'
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'


export default function Report() {
  const router = useRouter()

  const handleSubmit = () => {
    <Text>Hmmg</Text>
  }


  const [type, setType] = React.useState('')
  const [textAreaValue, setTextAreaValue] = React.useState('');



  return (
    <Box>
      <FormControl isRequired>
        <VStack space={4} className="mt-8 mx-8">
          <FormControl.Label _text={{ bold: true }}>Type:</FormControl.Label>
          <Box maxW="full">
            <Select
              selectedValue={type}
              minWidth="full"
              accessibilityLabel="Choose report type"
              placeholder="Choose report type"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setType(itemValue)}
            >
              <Select.Item label="Harrasment" value="harrasment" />
              <Select.Item label="Sexualisation" value="sexualisation" />
              <Select.Item label="Violence" value="violence" />
              <Select.Item label="Spam" value="spam" />
              <Select.Item label="Hate" value="hate" />
              <Select.Item label="Threatening behaviour" value="threatening_behaviour" />
              <Select.Item label="Other" value="other" />
            </Select>
          </Box>
          <FormControl.Label _text={{ bold: true }}>Description:</FormControl.Label>
          <Box maxW="full">
            <TextArea h={20} value={textAreaValue} 
            onChangeText={text => setTextAreaValue(text)}
            placeholder="Please enter incident details" 
            w="100%" maxW="full" />
          </Box>
        </VStack>
        
        <Button
          className="w-[300px] m-auto mt-10"
          onPress={() => handleSubmit()}
        >
          Submit Report
        </Button>
      </FormControl>
    </Box>
  )
}
