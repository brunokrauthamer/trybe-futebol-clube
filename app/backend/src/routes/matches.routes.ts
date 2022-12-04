import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import MatchesController from '../controllers/matches.controller';
import MatchesMiddleware from '../middlewares/matches.middleware';

const router = Router();

router.get('/', MatchesController.getAll.bind(MatchesController));
router.post(
  '/',
  authMiddleware,
  MatchesMiddleware.validateDifferentTeams.bind(MatchesMiddleware),
  MatchesMiddleware.validateTeamExists.bind(MatchesMiddleware),
  MatchesController.store.bind(MatchesController),
);
router.patch('/:id/finish', MatchesController.finish.bind(MatchesController));

router.patch('/:id', MatchesController.registerGoal.bind(MatchesController));

export default router;
