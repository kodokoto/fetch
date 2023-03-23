//Import @React-navigation/native and bottom-tabs
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
//Import pages from screens
import HomeScreen from '../screens/Home';
import ChatScreen from '../screens/Chat';  
import SearchScreen from '../screens/Search';  
import React from "react";

const Tab = createBottomTabNavigator();

export default function Tabs() {
    return(
          <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? "ios-home" : 'ios-home-outline';
                    } else if (route.name === 'Chat'){
                        iconName = focused ? 'ios-chatbubble' : 'ios-chatbubble-outline';
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'ios-search' : 'ios-search-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
          >
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Chat" component={ChatScreen} />
              <Tab.Screen name="Search" component={SearchScreen} />
          </Tab.Navigator>
    );
  }