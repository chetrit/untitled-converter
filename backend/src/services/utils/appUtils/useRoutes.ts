import { type Application } from 'express'

import login from '@routes/account/login/login'
import logout from '@routes/account/logout/logout'
import signup from '@routes/account/signup/signup'
import basicEndpoints from '@routes/basicEndpoints'
import session from '@routes/session'

const useRoutes = (app: Application): Application => (
  app
    .use(login)
    .use(logout)
    .use(session)
    .use(signup)
    .use(basicEndpoints)
)

export default useRoutes
