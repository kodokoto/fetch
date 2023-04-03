import { Box } from 'native-base';
import React from 'react';


export default function ColoredBox({ color = 'red', children }) {
  return <Box bg={color}>{children}</Box>;
}


