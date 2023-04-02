import TRPCProvider from './trpc' //mobile only
import React from 'react'

export default function Provider({ children }) {
  return (
    <TRPCProvider>{children}</TRPCProvider>
  )
}
