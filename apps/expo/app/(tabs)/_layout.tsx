import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function () {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4c8ab9',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name={focused ? 'ios-home' : 'ios-home-outline'} size={size} color={color} />
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name={focused ? 'ios-search' : 'ios-search-outline'} size={size} color={color} />
          },
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name={focused ? 'ios-chatbubble' : 'ios-chatbubble-outline'} size={size} color={color} />
          },
        }}
      />
    </Tabs>
  )
}
