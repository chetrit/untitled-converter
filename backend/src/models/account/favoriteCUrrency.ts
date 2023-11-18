import bcrypt from 'bcrypt'

import logger from '@middlewares/logging'

import { AccountAlreadyExistError, BcryptError, DbError } from '@services/utils/customErrors'

import { findEntity } from '@models/getObjects'

import { Account } from '@entities/Account'

import { appDataSource } from '@config/dataSource'

import { type accountRepositoryRequest } from './account'

// function which takes a string as a parameter and saves that to the favoriteCurrencies field of the account
// first, find the account based on the email
// then, update the favoriteCurrencies field with the string
// finally, save the updated field to the database

async function updateFavoriteCurrencies (email: string, favoriteCurrencies: string): Promise<Account> {
  const accountRepository = appDataSource.getRepository(Account)

  return await findEntity<Account>(Account, { email }).then((foundAccount: Account | null): any => {
    if (foundAccount === null) {
      throw new Error("Account doesn't exist")
    }
    return accountRepository.save({ ...foundAccount, favoriteCurrencies }).then((savedAccount: Account) => {
      logger.info(`Account has been updated: ${JSON.stringify(savedAccount, null, 2)}`)
      return savedAccount
    }).catch((err: Error) => {
      throw new DbError(err.message)
    })
  })
}

export default updateFavoriteCurrencies
