import { Router } from 'express';
import validateLoginBody from '../middlewares/login.middleware';
import loginController from '../controllers/login.controller';

const router = Router();

router.post(
  '/',
  validateLoginBody,
  loginController.login,
);

router.get('/validate', loginController.validateLogin);

export default router;
