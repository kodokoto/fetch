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

export default function ReportForm() {
  const router = useRouter()
  const { sitterId } = useSearchParams()
  const { user, isLoaded } = useUser()
  const [session, setSession] = useAtom(sessionAtom)
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
      toId: Number(sitterId)
    })

    router.push(`/sitter/${sitterId}`);
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
              _selectedItem={{
                bg: 'teal.600',
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
            w="100%" maxW="full" autoCompleteType={undefined} />
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
