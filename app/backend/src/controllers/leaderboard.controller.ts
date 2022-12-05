import { Request, Response } from 'express';
// import ILeaderBoard from '../interfaces/ILeaderBoard';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  static async getHome(_req: Request, res: Response) {
    const response = await LeaderboardService.getHome();
    res.status(200).json(response);
  }

  static async getAway(_req: Request, res: Response) {
    const response = await LeaderboardService.getAway();
    res.status(200).json(response);
  }
}
