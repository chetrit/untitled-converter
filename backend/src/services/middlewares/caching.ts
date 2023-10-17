import { type NextFunction, type Request, type Response } from 'express'

function caching (duration: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV !== 'development') {
      if (req.method === 'GET') {
        res.set('Cache-control', `public, max-age=${duration}`)
      } else {
        res.set('Cache-control', 'no-store')
      }
    }
    next()
  }
}

export default caching
