import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  static async getAll(_req: Request, res: Response) {
    const { type, message } = await MatchesService.getAll();
    res.status(type).json(message);
  }
}
