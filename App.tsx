import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Appointment from './src/screens/AppointmentDetails';
import SearchResults from './src/screens/SearchResults';
import Tabs from './src/components/Tab';
import { NativeBaseProvider, Box } from 'native-base';
import Settings from './src/screens/Settings';
import EditProfile from './src/screens/EditProfile';
import VisualSettings from './src/screens/VisualSettings';
import AboutUs from './src/screens/AboutUs';
import TermsAndConditions from './src/screens/TermsAndConditions';
import FAQ from './src/screens/FAQ';
import { useState } from 'react';
import FontContext from './src/components/FontContext';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AppointmentDetails" component={Appointment} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name='EditProfile' component={EditProfile} />
            <Stack.Screen name="SearchResults" component={SearchResults} />
            <Stack.Screen name="VisualSettings" component={VisualSettings} />
            <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
            <Stack.Screen name="FAQ" component={FAQ} />
          </Stack.Navigator>
        </NavigationContainer>
    </NativeBaseProvider>
  );
}
