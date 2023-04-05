import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'
import { appRouter } from 'api'
import { createContext } from 'api'

const app = express()

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
    onError({ error }) {
      // handle errors
      console.error(error)
    },
  })
)

app.listen(3000, () => console.log('up and running on', 'localhost:3000'))

export type { AppRouter } from 'api'
