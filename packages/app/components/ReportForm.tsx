import React from 'react'
import {
  Box,
  Select,
  FormControl,
  Button,
  CheckIcon, 
  TextArea, 
  VStack
} from 'native-base'

import { useRouter, useSearchParams } from 'expo-router'
import { api } from 'app/utils/trpc'
import { useUser } from '@clerk/clerk-expo'
import { useAtom } from 'jotai'
import { sessionAtom } from 'app/utils/storage'

export default function ReportForm({sitterId}: {sitterId: number}) {
  const router = useRouter()
  const [session, _] = useAtom(sessionAtom)
  const ownerid = session.ownerId
  const mutation = api.report.create.useMutation()

  const handleSubmit = () => {
    console.log("Type: " + type);
    console.log("Content: " + textAreaValue);
    console.log("Owner Id: " + ownerid);
    console.log("Sitter Id: " + sitterId);
    
    mutation.mutate({
      reportType: type,
      reportContent: textAreaValue,
      fromId: ownerid,
      toId: String(sitterId)
    })

    router.replace('/');
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
               
              selectedValue={String(type)}
              minWidth="full"
              accessibilityLabel="Choose report type"
              placeholder="Choose report type"
              rounded={'full'}
              _selectedItem={{
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setType(itemValue)}
            >
              <Select.Item label="Harrasment" value="HARRASMENT" />
              <Select.Item label="Violence" value="VIOLENCE" />
              <Select.Item label="Spam" value="SPAM" />
              <Select.Item label="Hate" value="HATE" />
              <Select.Item label="Threatening behaviour" value="THREATENING_BEHAVIOUR" />
              <Select.Item label="Other" value="OTHER" />
            </Select>
          </Box>
          <FormControl.Label _text={{ bold: true }}>Description:</FormControl.Label>
          <Box maxW="full">
            <TextArea h={20} value={textAreaValue}
            onChangeText={text => setTextAreaValue(text)}
            placeholder="Please enter incident details"
            rounded={'2xl'}
            w="100%" maxW="full" autoCompleteType={undefined} />
          </Box>
        </VStack>
        
        <Button
          className="w-10/12 rounded-full bg-blue-500 m-auto mt-10"
          onPress={() => handleSubmit()}
        >
          Submit Report
        </Button>
      </FormControl>
    </Box>
  )
}
