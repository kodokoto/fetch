import { AuthProvider } from './auth'
import { TRPCProvider } from './trpc' //mobile only

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
          <TRPCProvider>{children}</TRPCProvider>
    </AuthProvider>
  )
}
