import React, { useContext, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import FontContext from './FontContext';

function TextSizeSetting() {
  const { fontSize, setFontSize } = useContext(FontContext);
  const [textSize, setTextSize] = useState('');

  const handleTextSizeChange = (text) => {
    console.log('Text size changed to:', text);
    setTextSize(text);
    setFontSize(parseInt(text));
  };

  console.log('Font size:', fontSize);

  return (
    <View>
      <Text>Text Size</Text>
      <TextInput
        value={textSize}
        onChangeText={handleTextSizeChange}
        placeholder="Enter text size"
      />
    </View>
  );
}

export default TextSizeSetting;
