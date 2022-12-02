import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  static async getAll(_req: Request, res: Response) {
    const { type, message } = await TeamService.getAll();
    return res.status(type).json(message);
  }

  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { type, message } = await TeamService.getById(id);
    return res.status(type).json(message);
  }
}
