import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../src/screens/Home';
import Tabs from '../../src/components/Tab';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>  
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />   
        <Stack.Screen name="Home" component={Home} />       
           
      </Stack.Navigator>  
    </NavigationContainer>
  );
}


