import { Router } from 'express';
import validateLoginBody from '../middlewares/login.middleware';
import login from '../controllers/login.controller';

const router = Router();

router.post(
  '/',
  validateLoginBody,
  login,
);

export default router;
