import MatchModel from '../database/models/MatchModel';
// import IMatch from '../interfaces/IMatch';
import Team from '../database/models/TeamModel';

export default class MatchesService {
  static async getAll() {
    const response = await MatchModel
      .findAll({
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ] });
    const data = response.map((match) => match.dataValues);
    return { type: 200, message: data };
  }
}
