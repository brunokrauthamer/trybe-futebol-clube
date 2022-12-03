import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import MatchesController from '../controllers/matches.controller';

const router = Router();

router.get('/', MatchesController.getAll.bind(MatchesController));
router.post(
  '/',
  authMiddleware,
  MatchesController.store.bind(MatchesController),
);

export default router;
