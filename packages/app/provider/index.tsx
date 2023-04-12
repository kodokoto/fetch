import { AuthProvider } from './auth'
import TRPCProvider from './trpc' //mobile only
import React from 'react'
import ThemeProvider from './theme'
export default function Provider({ children }) {
  return (
    <AuthProvider>
      <TRPCProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </TRPCProvider>
    </AuthProvider>
  )
}
