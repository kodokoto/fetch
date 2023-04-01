import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Appointment from './src/screens/Appointment';
import SearchResults from './src/screens/SearchResults';
import Tabs from './src/components/Tab';
import { NativeBaseProvider } from 'native-base';
import Setting from './src/screens/Setting';
import EditProfile from './src/screens/EditProfile';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />   
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AppointmentDetails" component={Appointment} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name='EditProfile' component={EditProfile} />
          <Stack.Screen name="SearchResults" component={SearchResults} />
        </Stack.Navigator>  
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

