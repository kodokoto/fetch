import { View, Text } from 'react-native'
import React from 'react'
import Filter from '../components/Filter'
import ColoredBox from '../components/ColoredBox';
import FAQText from '../components/FAQText';

export default function FAQ() {
  return (
    <ColoredBox color='blue'>
        <FAQText/>
    </ColoredBox>
  );
}
