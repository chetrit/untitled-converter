import bcrypt from 'bcrypt'
import { type Session, type SessionData } from 'express-session'
import { StatusCodes } from 'http-status-codes'

import { AccountDoesNotExistError, BcryptError } from '@services/utils/customErrors'

import { findEntity } from '@models/getObjects'

import { Account } from '@entities/Account'

import { type accountRepositoryRequest } from './account'

function createSession (sess: Session & Partial<SessionData>, account: Account): void {
  const week = 3600000 * 24 * 7

  sess.cookie.expires = new Date(Date.now() + week)
  sess.cookie.maxAge = week
  sess.account = {
    id: account.id,
    email: account.email,
    firstName: account.firstName,
    lastName: account.lastName,
    bornDate: account.bornDate,
    createdDate: account.createdDate
  }
}

async function loginAccount (accountToLogin: accountRepositoryRequest, sess: Session): Promise<StatusCodes> {
  return await findEntity<Account>(Account, { email: accountToLogin.email }).then((foundAccount: Account | null): any => {
    if (foundAccount == null) {
      throw new AccountDoesNotExistError()
    }
    return bcrypt.compare(accountToLogin.password + foundAccount.salt, foundAccount.password).then((result: boolean) => {
      if (result) {
        createSession(sess, foundAccount)
        return StatusCodes.OK
      } else {
        return StatusCodes.FORBIDDEN
      }
    }).catch((err: Error) => {
      throw new BcryptError(err.message)
    })
  })
}

export { loginAccount }
