import React from 'react'
import { api } from '../../utils/trpc'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import Constants from 'expo-constants'

const getBaseUrl = () => {
  /**
   * Gets the IP address of your host-machine. If it cannot automatically find it,
   * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
   * you don't have anything else running on it, or you'd have to change it.
   */
  if (!__DEV__) {
    const productionApiUrl = Constants.manifest?.extra
      ?.productionApiUrl as string;
    if (!productionApiUrl)
      throw new Error(
        "failed to get productionApiUrl, missing in extra section of app.config.ts",
      );
    return productionApiUrl;
  }
  
  const localhost = Constants.manifest?.debuggerHost?.split(':')[0]
  if (!localhost) throw new Error('failed to get localhost, configure it manually')
  return `http://${localhost}:3000`
}

export default function TRPCProvider({ children }) {
  const [queryClient] = React.useState(() => new QueryClient())
  const [trpcClient] = React.useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          // async headers() {
          //   const authToken = await getToken()
          //   return {
          //     Authorization: authToken,
          //   }
          // },
          url: `${getBaseUrl()}/trpc`,
        }),
      ],
      transformer: undefined,
    })
  )

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  )
}
