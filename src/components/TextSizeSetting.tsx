import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

function TextSizeSetting() {
  const [textSize, setTextSize] = useState('')
  
  return (
    <View>
      <Text>Text Size</Text>
      <TextInput
        value={textSize}
        onChangeText={setTextSize}
        placeholder="Enter text size"
      />
    </View>
  )
}

export default TextSizeSetting