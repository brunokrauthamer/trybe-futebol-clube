import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import TeamModel from '../database/models/TeamModel';

import { Response } from 'superagent';
import Team from '../interfaces/ITeam';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes de Teams', () => {
  afterEach(sinon.restore);
  let response: Response;

  it('Verifica se retorna a lista de times em get /teams', async () => {
    sinon.stub(TeamModel, 'findAll').resolves([
      {
        id: 1,
        teamName: "Corinthians"
      },
      {
        id: 2,
        teamName: "Bahia"
      }] as TeamModel[])

      const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body[0].teamName.to.be.equal('Corinthians'));
  })
})