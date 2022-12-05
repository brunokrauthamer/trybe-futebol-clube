import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

router.get('/home', LeaderboardController.getHome.bind(LeaderboardController));
router.get('/away', LeaderboardController.getAway.bind(LeaderboardController));
router.get('/', LeaderboardController.getAll.bind(LeaderboardController));

export default router;
