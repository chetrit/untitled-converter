import { StatusCodes } from 'http-status-codes'

class AppError extends Error {
  constructor (message?: string, status?: StatusCodes) {
    super(message ?? 'Internal Server error.')
    this.status = status ?? StatusCodes.INTERNAL_SERVER_ERROR
    this.name = this.constructor.name
  }

  status: StatusCodes
}

class AccountAlreadyExistError extends AppError {
  constructor (message?: string, status?: StatusCodes) {
    super(message ?? 'Account already exists.', status ?? StatusCodes.CONFLICT)
  }
}

class AccountDoesNotExistError extends AppError {
  constructor (message?: string, status?: StatusCodes) {
    super(message ?? 'Account does not exist.', status ?? StatusCodes.FORBIDDEN)
  }
}

class AlreadyLoggedInError extends AppError {
  constructor (message?: string, status?: StatusCodes) {
    super(message ?? 'User is already logged in.', status ?? StatusCodes.BAD_REQUEST)
  }
}
class ApiError extends AppError {}

class BcryptError extends AppError {}

class DbError extends AppError {}

class NotLoggedInError extends AppError {
  constructor (message?: string, status?: StatusCodes) {
    super(message ?? 'User is not logged in.', status ?? StatusCodes.BAD_REQUEST)
  }
}

export {
  AccountAlreadyExistError,
  AccountDoesNotExistError,
  AlreadyLoggedInError,
  ApiError,
  AppError,
  BcryptError,
  DbError,
  NotLoggedInError
}
