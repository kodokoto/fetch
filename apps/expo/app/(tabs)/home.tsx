import React from 'react'
import { Redirect } from 'expo-router'
import { useAtom } from 'jotai'
import { sessionAtom } from 'app/utils/storage'
import OwnerHomeScreen from 'app/screens/OwnerHomeScreen'
import SitterHomeScreen from 'app/screens/SitterHomeScreen'

export default function Home() {

  const [session, _] = useAtom(sessionAtom);

  if (session.currentProfile === "Owner") {
    return <OwnerHomeScreen />
  } else if (session.currentProfile === "Sitter") {
    return <SitterHomeScreen />
  } else {
    return <Redirect href="/create" />
  }
}
