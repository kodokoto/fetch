//Import @React-navigation/native and bottom-tabs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { ImageBackground } from 'react-native'
//Import pages from screens
import HomeScreen from '../screens/Home'
import ChatScreen from '../screens/Chat'
import SearchScreen from '../screens/Search'
import ProfileScreen from '../screens/ViewProfileSitter'
import React from 'react'

const Tab = createBottomTabNavigator()

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline'
          } else if (route.name === 'Chat') {
            iconName = focused ? 'ios-chatbubble' : 'ios-chatbubble-outline'
          } else if (route.name === 'Search') {
            iconName = focused ? 'ios-search' : 'ios-search-outline'
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ios-person' : 'ios-person-outline'
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
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}
