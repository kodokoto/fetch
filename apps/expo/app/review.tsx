import React, { useState } from 'react'
import { View, Text, Button, Input, Box, CheckIcon, FormControl, Select, TextArea, VStack } from 'native-base'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { api } from 'app/utils/trpc';
import { useAtom } from 'jotai';
import { useSearchParams, useRouter } from 'expo-router'
import { sessionAtom } from 'app/utils/storage';
import { userRouter } from 'api/src/router/user';

export default function ReviewSystem(props) {
  const { sitterId } = useSearchParams()
  const router = useRouter();
  const [score, setScore] = useState(3)
  const [message, setMessage] = useState('')
  const [session, _] = useAtom(sessionAtom)

  console.log("Sitter Idddd 2: " + sitterId);

  const mutation = api.review.create.useMutation()

  const handleSubmit = () => {
    console.log(`Submitted review with score ${score} and message: ${message}`)

    console.log({
      rating: Number(score),
      content: message,
      fromId: session.ownerId,
      toId: sitterId
    });
    

    mutation.mutate({
      rating: Number(score),
      content: message,
      fromId: session.ownerId,
      toId: String(sitterId)
    })

    router.push(`/sitter/${sitterId}`);
  }

  let ratingCompleted = (rating) => {
    console.log("Rating is: " + rating)
    if(rating){
      setScore(rating);
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
                reviews={["1/5","2/5","3/5","4/5","5/5"]}
                onFinishRating={ratingCompleted}
                defaultRating={3}
              />
          </Box>
          <FormControl.Label _text={{ bold: true }}>Description:</FormControl.Label>
          <Box maxW="full">
            <TextArea h={20} value={message}
            onChangeText={text => setMessage(text)}
            placeholder="Please enter your review description..."
            w="100%" maxW="full" autoCompleteType={undefined} />
          </Box>
        </VStack>
        
        <Button
          className="w-[300px] m-auto mt-10 rounded-full bg-blue-500"
          onPress={() => handleSubmit()}
        >
          Submit Review
        </Button>
      </FormControl>
      {/* <Text>Rate your experience:</Text> */}
      {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={() => setScore('1')}>1</Button>
        <Button onPress={() => setScore('2')}>2</Button>
        <Button onPress={() => setScore('3')}>3</Button>
        <Button onPress={() => setScore('4')}>4</Button>
        <Button onPress={() => setScore('5')}>5</Button>
      </View> */}
      {/* <Rating
        showRating
        onFinishRating={(e) => ratingCompleted(e)}
        style={{ paddingVertical: 10 }}
        type="custom"
        ratingBackgroundColor='white'
        tintColor='rgb(229 231 235)'
      />
      <Input
        placeholder="Type a message..."
        value={message}
        onChangeText={setMessage}
        multiline={true}
        style={{ 
          height: 100,
          backgroundColor: 'white'
         }}
      />
      <Button onPress={handleSubmit}>Submit</Button> */}
    </Box>
  )
}
