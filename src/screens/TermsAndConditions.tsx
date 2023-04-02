import { View, Text } from 'react-native'
import React from 'react'
import Filter from '../components/Filter'
import ColoredBox from '../components/ColoredBox';
import TermsAndConditionsText from '../components/TermsAndConditionsText';

export default function TermsAndConditions() {
  return (
    <ColoredBox color='blue'>
        <TermsAndConditionsText/>
    </ColoredBox>
  );
}
