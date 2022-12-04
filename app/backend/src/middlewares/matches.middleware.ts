import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class MatchesMiddleware {
  // static validateTeamsInsert(req: Request, res: Response, next: NextFunction) {
  // this.validateDifferentTeams(req, res, next);
  // this.validateTeamExists(req, res, next);
  // }

  static validateDifferentTeams(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const { homeTeam, awayTeam } = body;
    console.log(typeof homeTeam, awayTeam);
    if (homeTeam === awayTeam) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  }

  static async validateTeamExists(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const { homeTeam, awayTeam } = body;
    const validHomeTeam = await TeamService.validateTeamExists(homeTeam);
    const validAwayTeam = await TeamService.validateTeamExists(awayTeam);

    if (validHomeTeam && validAwayTeam) {
      return next();
    }

    return res.status(404).json({ message: 'There is no team with such id!' });
  }
}
