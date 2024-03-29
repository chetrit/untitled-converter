import { type Request, type Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { logApiRequest } from '@middlewares/logging'
import validate from '@middlewares/validator'

const router = Router()

const rules = []

/**
 * @swagger
 * /session:
 *   get:
 *     summary: Get current session
 *     description: Retrieve the details of the current session.
 *     responses:
 *       '200':
 *         description: Current session details.
 *         schema:
 *           type: object
 */
router.get('/session', rules, validate, logApiRequest, (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(req.session)
})

export default router
