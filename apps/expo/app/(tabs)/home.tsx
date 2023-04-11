import React from 'react'
import { Redirect } from 'expo-router'
import { useAtom } from 'jotai'
import { Profile, sessionAtom } from 'app/utils/storage'
import OwnerHomeScreen from 'app/screens/OwnerHomeScreen'
import SitterHomeScreen from 'app/screens/SitterHomeScreen'
import { useUser } from '@clerk/clerk-expo'
import { api } from 'app/utils/trpc'

export default function Home() {
  const { user, isLoaded } = useUser()
  const userId = user?.id

  const { data, isLoading } = api.user.getProfiles.useQuery(userId, { enabled: !!userId, cacheTime: 0 })
  const [session, setSession] = useAtom(sessionAtom);


  if (!isLoaded || isLoading) return null

  console.log('rendering home')
  console.log('FROM SERVER:', data)

  console.log('FROM SESSION:', session)

  // if the user is different from the previous user, update the session
  if (session.currentUser != userId) {
    setSession({
      currentUser: userId,
      currentProfile: data.owner ? Profile.OWNER : data.sitter ? Profile.SITTER : Profile.NONE,
      ownerId: data.owner ? data.owner.id : null,
      sitterId: data.sitter ? data.sitter.id : null,
    })
  }

  // if both data.owner and data.sitter are null, redirect to create profile
  if (data == undefined || (!data.owner && !data.sitter)) {
    return <Redirect href="/create" />
  }

  // if data.sitter is null, and session.sitterId is not null, update the session
  if (!data.sitter && session.sitterId) {
    setSession({...session, sitterId: null})
  }

  // if data.owner is null, and session.ownerId is not null, update the ownerId in the session, keep the rest the same
  if (!data.owner && session.ownerId) {
    setSession({...session, ownerId: null})
  }

  // if a owner id or a sitter id exists, but the session does not have a current profile, update the session
  // to owner id (if it exists) or sitter id 
  if ((data.owner || data.sitter) && session.currentProfile == Profile.NONE) {
    data.owner 
    ? setSession({...session, currentProfile: Profile.OWNER, ownerId: data.owner.id})
    : setSession({...session, currentProfile: Profile.SITTER, sitterId: data.sitter.id})
  }

  if (data.owner && data.owner.id != session.ownerId) {
    setSession({...session, ownerId: data.owner.id})
  }
  if  (data.sitter && data.sitter.id != session.sitterId) {
    setSession({...session, sitterId: data.sitter.id})
  }




  if (session.currentProfile === Profile.OWNER) {
    return <OwnerHomeScreen />
  } 
  if (session.currentProfile === Profile.SITTER) {
    return <SitterHomeScreen />
  } 
  return <Redirect href="/create" />
}
