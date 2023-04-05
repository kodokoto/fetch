import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from './cache'
import React from 'react'

// const frontendApi = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const frontendApi = 'pk_test_Y2FyaW5nLXB1cC0zMi5jbGVyay5hY2NvdW50cy5kZXYk'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (typeof frontendApi === 'undefined')
    throw new Error('Clerk API key not found. Please add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file.')

  return (
    <ClerkProvider frontendApi={frontendApi} tokenCache={tokenCache}>
      {children}
    </ClerkProvider>
  )
}
