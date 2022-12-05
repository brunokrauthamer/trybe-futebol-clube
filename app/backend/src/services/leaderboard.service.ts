// import ILeaderBoard from '../interfaces/ILeaderBoard';
import IMatch from '../interfaces/IMatch';
import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import TeamStats from '../utils/TeamStats';
// import ILeaderBoard from '../interfaces/ILeaderBoard';

export default class LeaderboardService {
  static async getTeamsList() {
    const teamsList = (await TeamModel.findAll()).map((team) => {
      const { dataValues } = team;
      const { id, teamName } = dataValues;
      console.log(dataValues);
      return new TeamStats(id, teamName);
    });
    return teamsList;
  }

  static async getMatchesList() {
    const matchesList = (await MatchModel.findAll())
      .map((match: { dataValues: IMatch }) => match.dataValues);
    return matchesList;
  }

  static async getHome() {
    const teamsList = await this.getTeamsList();

    const matchesList = await this.getMatchesList();

    matchesList.forEach((match) => {
      const { homeTeam, homeTeamGoals, awayTeamGoals, inProgress } = match;
      teamsList[homeTeam - 1].updatePrimaryInfo(homeTeamGoals, awayTeamGoals, inProgress);
    });

    const response = teamsList.map((team) => team.response());
    response.sort((teamA, teamB) => {
      if (teamA.totalPoints !== teamB.totalPoints) { return teamB.totalPoints - teamA.totalPoints; }
      if (teamA.totalVictories !== teamB.totalVictories) {
        return teamB.totalVictories - teamA.totalVictories;
      }
      if (teamA.goalsBalance !== teamB.goalsBalance) {
        return teamB.goalsBalance - teamA.goalsBalance;
      }
      return teamB.goalsFavor - teamA.goalsFavor;
    });
    return response;
  }
}
