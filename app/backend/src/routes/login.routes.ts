import { Router } from 'express';
import validateLoginBody from '../middlewares/login.middleware';

const router = Router();

router.post(
  '/',
  validateLoginBody,
);

export default router;
