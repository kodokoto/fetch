//Import @React-navigation/native and bottom-tabs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { ImageBackground } from 'react-native'
//Import pages from screens
import HomeScreen from '../screens/Home'
import ChatScreen from '../screens/Chat'
import SearchScreen from '../screens/Search'
import React from 'react'
import Appointment from '../screens/Appointment'
import Setting from '../screens/Settings'

const Tab = createBottomTabNavigator()

//create a function which cahnges the colour of the background in Tab.tsx to black


export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline'
          } else if (route.name === 'Appointment'){
            iconName = focused ? 'ios-calendar' : 'ios-calendar-outline'
          } else if (route.name === 'Chat') {
            iconName = focused ? 'ios-chatbubble' : 'ios-chatbubble-outline'
          } else if (route.name === 'Search') {
            iconName = focused ? 'ios-search' : 'ios-search-outline'
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#4c8ab9',
        tabBarStyle: {
          borderTopWidth: 0,
          borderLeftWidth: 0,
          padding: 0,
          elevation: 0,
        },
        tabBarBackground: () => (
          <ImageBackground
            style={{
              flex: 1,
              width: '110%',
              height: '150%',
              //flexDirection: "row",
              alignItems: 'center',
              marginLeft: -15,
              marginBottom: -30,
              paddingLeft: '85%',
              justifyContent: 'center',
            }}
            source={require('../assets/Bifford.png')}
            resizeMode="cover"
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Appointment" component={Appointment} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
  )
}
