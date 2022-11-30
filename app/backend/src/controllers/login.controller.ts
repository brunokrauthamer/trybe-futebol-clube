import { Request, Response } from 'express';
import LoginService from '../services/login.service';

async function login(req: Request, res:Response) {
  const { type, message, user } = await LoginService.getByEmail(req.body.email, req.body.password);
  if (type) {
    return res.status(type).json({ message });
  }
  req.body.user = user;
  return res.status(200).json({ token: message });
}

export default login;
