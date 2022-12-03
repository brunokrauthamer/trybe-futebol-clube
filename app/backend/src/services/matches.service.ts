import MatchModel from '../database/models/MatchModel';
// import IMatch from '../interfaces/IMatch';
import Team from '../database/models/TeamModel';
import stringToBool from '../utils/stringToBool';

export default class MatchesService {
  static async getAll() {
    const response = await MatchModel
      .findAll({
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      });
    const data = response.map((match) => match.dataValues);
    return { type: 200, message: data };
  }

  static async getAllFilteredByProgress(inProg: string) {
    const inProgress = stringToBool(inProg);
    const response = await MatchModel
      .findAll({
        where: { inProgress },
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      });
    const data = response.map((match) => match.dataValues);
    return { type: 200, message: data };
  }

  static async store(match: object) {
    const response = await MatchModel.create({
      ...match,
      inProgress: true,
    });
    return response.dataValues;
  }
}
