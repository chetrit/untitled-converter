import PostgresStore from 'connect-pg-simple'
import { type Application } from 'express'
import session, { type SessionOptions } from 'express-session'
import pg from 'pg'

interface SessionAccount {
  id: string
  email: string
  firstName?: string
  lastName?: string
  bornDate?: Date
  createdDate: Date
}

declare module 'express-session' {
  export interface SessionData {
    account: SessionAccount
  }
}

function useSession (app: Application): PostgresStore.PGStore {
  const week = 3600000 * 24 * 7

  const pgPool = new pg.Pool({
    host: process.env.TYPEORM_HOST,
    database: process.env.TYPEORM_DATABASE,
    password: process.env.TYPEORM_PASSWORD,
    user: process.env.TYPEORM_USERNAME,
    port: process.env.TYPEORM_PORT
  })

  const postgresClient: PostgresStore.PGStore = new (PostgresStore(session))({
    createTableIfMissing: true,
    tableName: 'session',
    pool: pgPool
  })

  const sess: SessionOptions = {
    store: postgresClient,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: week,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
    }
  }
  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1)
    sess.cookie!.secure = true
  }

  app.use(session(sess))
  return postgresClient
}

export default useSession
