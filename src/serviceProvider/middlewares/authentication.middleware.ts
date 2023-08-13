import { Request, Response, NextFunction } from 'express'
import { verifyJWT } from '@/serviceProvider/utils/jwt'
import HttpException from '@/serviceProvider/errors/errors.httpException'

export const authenticationMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get('authorization')
  if (authorizationHeader) {
    const token = authorizationHeader.split(' ')[1]
    const isTokenValid = await verifyJWT(token)

    if (isTokenValid.isValid === false) next(new HttpException('Token is not valid', 401))

    res.locals.userId = isTokenValid.userId
    // req.userId = isTokenValid.userId
  } else next(new HttpException('No authorization header found', 401))

  return next()
}
