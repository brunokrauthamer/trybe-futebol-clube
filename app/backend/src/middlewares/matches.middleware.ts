import { NextFunction, Request, Response } from 'express';

export default class MatchesMiddleware {
  static validateDifferentTeams(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const { homeTeam, awayTeam } = body;
    if (homeTeam === awayTeam) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  }
}
