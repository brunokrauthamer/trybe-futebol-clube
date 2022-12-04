import Team from '../interfaces/ITeam';
import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  static async getAll(): Promise<{ type: number, message: Team[] }> {
    const response = await TeamModel.findAll() as Team[];
    return { type: 200, message: response };
  }

  static async getById(id: number): Promise<{ type: number, message: Team }> {
    const response = await TeamModel.findByPk(id);
    const data = response?.dataValues as Team;
    console.log('data\n\n\n\n\n\n', data);
    return { type: 200, message: data };
  }

  static async validateTeamExists(id: number):Promise<boolean> {
    const response = await this.getById(id);
    console.log('response \n\n\n\n\n', response);
    const { message } = response;
    if (typeof message === 'undefined') {
      return false;
    }
    return true;
  }
}
