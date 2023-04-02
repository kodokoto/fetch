import { AuthProvider } from './auth'
import TRPCProvider from './trpc' //mobile only
import React from 'react'

export default function Provider({ children }) {
  return (
    <AuthProvider>
      <TRPCProvider>{children}</TRPCProvider>
    </AuthProvider>
  )
}
