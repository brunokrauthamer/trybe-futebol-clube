import ILeaderBoard from '../interfaces/ILeaderBoard';

export default class TeamStats {
  private _id: number;
  private _name: string;
  private _totalVictories: number;
  private _totalDraws: number;
  private _totalLosses: number;
  private _goalsFavor: number;
  private _goalsOwn: number;

  constructor(id: number, name:string) {
    this._id = id;
    this._name = name;
    this._totalVictories = 0;
    this._totalDraws = 0;
    this._totalLosses = 0;
    this._goalsFavor = 0;
    this._goalsOwn = 0;
  }

  updatePrimaryInfo(goalsFavor: number, goalsOwn: number): void {
    this._goalsFavor += goalsFavor;
    this._goalsOwn += goalsOwn;
    if (goalsFavor > goalsOwn) {
      this._totalVictories += 1;
    } else if (goalsFavor === goalsOwn) {
      this._totalDraws += 1;
    } else {
      this._totalLosses += 1;
    }
  }

  response(): ILeaderBoard {
    const totalPoints = 3 * this._totalVictories + 1 * this._totalDraws;
    const totalGames = this._totalVictories + this._totalDraws + this._totalLosses;
    const goalsBalance = this._goalsFavor - this._goalsOwn;
    const efficiency = Number(((100 * totalPoints) / (3 * totalGames)).toFixed(2));

    return ({
      name: this._name,
      totalPoints,
      totalGames,
      totalVictories: this._totalVictories,
      totalDraws: this._totalDraws,
      totalLosses: this._totalLosses,
      goalsFavor: this._goalsFavor,
      goalsOwn: this._goalsOwn,
      goalsBalance,
      efficiency,
    });
  }
}
