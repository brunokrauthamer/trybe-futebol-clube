import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import User from '../database/models/UserModel';
import LoginService from '../services/login.service';
import * as jwt from 'jsonwebtoken';

import { Response } from 'superagent';
import IUser from '../interfaces/IUser';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Realiza os testes relacionados a requisições para a rota /login', () => {
  afterEach(sinon.restore);
  let response: Response;

  it('Verifica requisição correta para a rota', async () => {

    const payloadMock = {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
    }

    sinon.stub(LoginService, 'getByEmail').resolves({
      type: null,
      message: 'token',
      user: payloadMock,
    });

    response = await chai
       .request(app)
       .post('/login')
       .send({
         email: 'aaa@aaa.com',
         password: '123456'
      })

    expect(response.status).to.be.equal(200);
    expect(response.body.token).to.be.equal('token');
  });

  it('Verifica requisição correta para a rota /login/validate', async () => {

    sinon.stub(LoginService, 'validateToken').resolves({
      valid: true,
      data: {
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
      }
    });

    const response = await chai
       .request(app)
       .get('/login/validate/')

    expect(response.status).to.be.equal(200);
    expect(response.body.role).to.be.equal('admin');

  });
  

  it('Corpo de requisição sem o campo email', async () => {
    response = await chai
       .request(app)
       .post('/login')
       .send({
         emil: 'aaa@aaa.com',
         password: '123456'
      })

    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('All fields must be filled');
  });

  it('Corpo de requisição sem o campo password', async () => {
    response = await chai
       .request(app)
       .post('/login')
       .send({
         email: 'aaa@aaa.com',
         passwordd: '123456'
      })

    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('All fields must be filled');
  });

  it('Corpo de requisição com o campo email inválido', async () => {
    response = await chai
       .request(app)
       .post('/login')
       .send({
         email: 'aaa@aaa.com',
         password: '123456'
      })

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Incorrect email or password');
  });

  it('Corpo de requisição com o campo password inválido', async () => {
    response = await chai
       .request(app)
       .post('/login')
       .send({
         email: 'user@user.com',
         password: '123456'
      })

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Incorrect email or password');
  });

  it('Verifica o funcionamento da camada Service quando informado email e senha corretamente', async () => {
    const mockResponse = {
      dataValues: {
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$12$OZa3PRVME6z2hA7Q2WbLLOzrKnntSel8qeAi60/cbkw33yDFxwBjO'
      }
    }

    const payload = mockResponse.dataValues;

    const mockToken = 'token';

    sinon.stub(User, 'findOne').resolves(mockResponse as User);

    sinon.stub(LoginService, 'generateToken').resolves({ token: mockToken, payload })

    const response = await LoginService.getByEmail('admin@admin.com', '123456');

    expect(response.type).to.be.equal(null);
    expect(response.message).to.be.equal('token');
    expect(response.user).to.be.equal(payload);

  });

  it('Verifica o funcionamento da camada Service quando informado email inexistente', async () => {
    const mockResponse = null

    sinon.stub(User, 'findOne').resolves(mockResponse as null)

    const response = await LoginService.getByEmail('aaa@aaa.com', '123456');

    expect(response.type).to.be.equal(401);
    expect(response.message).to.be.equal('Incorrect email or password');
    expect(response.user).to.be.equal(null);


  });

  it('Verifica o comportamento do método generateToken', async () => {
    sinon.stub(jwt, 'sign').resolves('token' as string);

    const response = await LoginService.generateToken({
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$12$OZa3PRVME6z2hA7Q2WbLLOzrKnntSel8qeAi60/cbkw33yDFxwBjO'
    });

    expect(response.payload).to.be.deep.equal({
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
    });

  });

  it('Verifica o comportamento do método validateToken com token válido', () => {
    const dataMock = {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
    }

    sinon.stub(jwt, 'verify').resolves(dataMock as IUser);

    const response = LoginService.validateToken('token');

    expect(response.valid).to.be.equal(true)
  });

});


