import { AuthProvider } from './auth'
import TRPCProvider from './trpc' //mobile only
import React from 'react'
import { NativeBaseProvider } from 'native-base'

export default function Provider({ children }) {
  return (
    <AuthProvider>
      <TRPCProvider>
        <NativeBaseProvider>
          {children}
        </NativeBaseProvider>
      </TRPCProvider>
    </AuthProvider>
  )
}
