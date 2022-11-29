import { NextFunction, Request, Response } from 'express';

function validUsername(req: Request): boolean {
  const { email } = req.body;
  if (!email) {
    return false;
  }
  return true;
}

function validassword(req: Request): boolean {
  const { password } = req.body;
  if (!password) {
    return false;
  }
  return true;
}

function validateLoginBody(req: Request, res: Response, next: NextFunction) {
  if (validUsername(req) && validassword(req)) {
    return next();
  }
  res.status(400).json({ message: 'All fields must be filled' });
}

export default validateLoginBody;
