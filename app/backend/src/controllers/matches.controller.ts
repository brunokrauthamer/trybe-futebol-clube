import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  static async getAll(req: Request, res: Response) {
    let response;
    if (req.query.inProgress === undefined) {
      response = await MatchesService.getAll();
    } else {
      response = await MatchesService.getAllFilteredByProgress(req.query.inProgress as string);
    }
    res.status(response.type).json(response.message);
  }

  static async store(req: Request, res: Response) {
    const match = req.body;
    console.log('match \n\n\n\n\n', match);
    const response = await MatchesService.store(match);
    res.status(201).json(response);
  }

  static async finish(req: Request, res: Response) {
    const id = Number(req.params.id);
    await MatchesService.finish(id);
    res.status(200).json({ message: 'Finished' });
  }
}
