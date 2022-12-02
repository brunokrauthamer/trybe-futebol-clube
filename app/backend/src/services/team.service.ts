import Team from '../interfaces/ITeam';
import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  static async getAll(): Promise<{ type: number, message: Team[] }> {
    const response = await TeamModel.findAll() as Team[];
    return { type: 200, message: response };
  }
}
