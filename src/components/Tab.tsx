//Import @React-navigation/native and bottom-tabs
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//Import pages from screens
import HomeScreen from '../screens/Home';
import SecondScreen from '../screens/Second';  
import React from "react";

const Tab = createBottomTabNavigator();

export default function Tabs() {
    return(
          <Tab.Navigator>
              <Tab.Screen name="Home" component={HomeScreen} />
              {/* Test screen to see if switching works, other screens will be here */}
              <Tab.Screen name="Second" component={SecondScreen} />
          </Tab.Navigator>
    );
  }