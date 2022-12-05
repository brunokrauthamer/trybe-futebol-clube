import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

router.get('/home', LeaderboardController.getHome.bind(LeaderboardController));

export default router;
