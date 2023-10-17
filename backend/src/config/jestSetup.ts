import { afterAll, beforeAll } from '@jest/globals'
import type connectPgSimple from 'connect-pg-simple'
import express, { type Application } from 'express'

import { useRoutes, useMiddlewares, useSession } from '@services/utils/appUtils/appUtils'

import { appDataSource } from '@config/dataSource'

let app: Application

let postgresClient: connectPgSimple.PGStore

beforeAll(async () => {
  app = express()
  await appDataSource.initialize().then(() => {
    postgresClient = useSession(app)
    useMiddlewares(app)
    useRoutes(app)
  }).catch((err) => {
    console.error('Error during Data Source initialization:', err)
    process.exit(1)
  })
})

afterAll(async () => {
  await appDataSource.destroy()
  postgresClient.close()
})

export { app }
