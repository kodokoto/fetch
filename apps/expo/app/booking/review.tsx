import React, { useState } from 'react'
import { View, Text, Button, Input } from 'native-base'

export default function ReviewSystem() {
  const [score, setScore] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    console.log(`Submitted review with score ${score} and message: ${message}`)
  }

  return (
    <View>
      <Text>Rate your experience:</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={() => setScore('1')}>1</Button>
        <Button onPress={() => setScore('2')}>2</Button>
        <Button onPress={() => setScore('3')}>3</Button>
        <Button onPress={() => setScore('4')}>4</Button>
        <Button onPress={() => setScore('5')}>5</Button>
      </View>
      <Input
        placeholder="Type a message..."
        value={message}
        onChangeText={setMessage}
        multiline={true}
        style={{ height: 100 }}
      />
      <Button onPress={handleSubmit}>Submit</Button>
    </View>
  )
}
