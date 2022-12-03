import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export default function authMiddleware(req: Request, res:Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (authorization === undefined) {
    return res.status(401).json({ message: 'You must provide a token' });
  }
  try {
    const data = jwt.verify(authorization, 'jwt_secret');
    req.body.user = data;
  } catch {
    return res.status(400).json({ message: 'Invalid Token' });
  }
  next();
}
