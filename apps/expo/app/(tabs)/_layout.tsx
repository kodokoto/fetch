import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'

export default function () {
  const [session, setSession] = useAtom(sessionAtom);
  if(session.currentProfile == Profile.OWNER){
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
          name="pets"
          options={{
            title: 'pets',
            tabBarIcon: ({ focused, color, size }) => {
              return <Ionicons name={focused ? 'ios-paw' : 'ios-paw-outline'} size={size} color={color} />
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
        name="services"
        options={{
          title: 'Services',
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name={focused ? 'ios-add-circle' : 'ios-add-circle-outline'} size={size} color={color} />
          },
          href: null,
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
  } else {
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
          name="pets"
          options={{
            title: 'Pets',
            href: null,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ focused, color, size }) => {
              return <Ionicons name={focused ? 'ios-search' : 'ios-search-outline'} size={size} color={color} />
            },
            href: null
          }}
        />
          <Tabs.Screen
        name="services"
        options={{
          title: 'Services',
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name={focused ? 'ios-add-circle' : 'ios-add-circle-outline'} size={size} color={color} />
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
 
}
