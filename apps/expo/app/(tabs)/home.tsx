import React from 'react'
import { Redirect } from 'expo-router'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'
import OwnerHomeScreen from 'app/screens/OwnerHomeScreen'
import SitterHomeScreen from 'app/screens/SitterHomeScreen'

export default function Home() {

  const [session, _] = useAtom(sessionAtom);

  if (session.currentProfile === Profile.OWNER) {
    return <OwnerHomeScreen />
  } 
  if (session.currentProfile === Profile.SITTER) {
    return <SitterHomeScreen />
  } 
  return <Redirect href="/create" />
}
