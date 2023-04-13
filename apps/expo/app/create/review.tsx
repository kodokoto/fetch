import React, { useState } from 'react'
import { Text, Button, Box, FormControl, TextArea, VStack } from 'native-base'
import { AirbnbRating } from 'react-native-ratings'
import { api } from 'app/utils/trpc'
import { useAtom } from 'jotai'
import { useSearchParams, useRouter } from 'expo-router'
import { sessionAtom } from 'app/utils/storage'

export default function ReviewSystem(props) {
  const { sitterId } = useSearchParams()
  const router = useRouter()
  const [score, setScore] = useState(3)
  const [message, setMessage] = useState('')
  const [session, _] = useAtom(sessionAtom)

  const mutation = api.review.create.useMutation()

  const handleSubmit = () => {

    mutation.mutate({
      rating: Number(score),
      content: message,
      fromId: session.ownerId,
      toId: String(sitterId),
    })

    router.replace(`/sitter/${sitterId}`)
  }

  const ratingCompleted = (rating) => {
    if (rating) {
      setScore(rating)
    }
  }

  return (
    <Box>
      <FormControl isRequired>
        <VStack space={4} className="mt-8 mx-8">
          <Box maxW="full">
            <FormControl.Label _text={{ bold: true }}>Rating:</FormControl.Label>
            <AirbnbRating
              showRating
              reviews={['1/5', '2/5', '3/5', '4/5', '5/5']}
              onFinishRating={ratingCompleted}
              defaultRating={3}
            />
          </Box>
          <FormControl.Label _text={{ bold: true }}>Description:</FormControl.Label>
          <Box maxW="full">
            <TextArea
              h={20}
              value={message}
              onChangeText={(text) => setMessage(text)}
              placeholder="Please enter your review description..."
              w="100%"
              maxW="full"
              autoCompleteType={undefined}
            />
          </Box>
        </VStack>

        <Button className="w-[300px] m-auto mt-10 rounded-full bg-blue-500" onPress={() => handleSubmit()}>
          <Text className='text-white font-bold'>Submit Review</Text>
        </Button>
      </FormControl>
    </Box>
  )
}
