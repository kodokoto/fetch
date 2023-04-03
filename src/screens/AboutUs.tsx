import { View, Text } from 'react-native'
import React from 'react'
import Filter from '../components/Filter'
import ColoredBox from '../components/ColoredBox';
import AboutUsText from '../components/AboutUsText';

export default function AboutUs() {
  return (
    <ColoredBox color='blue'>
        <AboutUsText/>
    </ColoredBox>
  );
}
