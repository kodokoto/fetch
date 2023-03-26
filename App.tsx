import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Appointment from './src/screens/Appointment';
import AppointmentsPreview from './src/components/AppointmentPreview';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Appointment" component={Appointment} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


