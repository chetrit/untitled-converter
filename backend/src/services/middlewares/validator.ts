import { type NextFunction, type Request, type Response } from 'express'
import { type Result, type ValidationError, validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'

const validate = (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined => {
  const errors: Result<ValidationError> = validationResult(req)
  if (errors.isEmpty()) {
    next()
    return
  }
  const extractedErrors: any[] = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    errors: extractedErrors
  })
}

export default validate
