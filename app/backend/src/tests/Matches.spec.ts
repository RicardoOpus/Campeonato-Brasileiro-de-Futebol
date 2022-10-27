import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as Sinon from 'sinon';
import { app } from '../app'
import { Response } from 'superagent';
import Match from '../database/models/matches'
import { mockMatches } from './mocks/matchesMock'
import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;

describe('TESTES DA ROTA /matches', () => {
  let chaiHttpResponse: Response;

  before(async() => {
    Sinon.stub(Match, 'findAll').resolves();
  });
  after(async() => {
      (Match.findAll as Sinon.SinonStub).restore();
    });

  describe('Verifica casos de acerto', () => {
    it('deve retornar todas as partidas', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches')
      expect(chaiHttpResponse).to.have.status(200);
    })
  })
  describe('Verifica filtro de partidas em andamento', () => {
    it('deve retornar resultado filtrado por partidas em andamento e o status 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true')
      expect(chaiHttpResponse).to.have.status(200);
    })
  })
  describe('Verifica cadastro de nova partida', () => {
    before(async() => {
      Sinon.stub(jwt, 'verify').resolves(true);
    })
    after(async() => {
      (jwt.verify as Sinon.SinonStub).restore();
    });
    it('deve retornar as informações da partida e o status 200', async () => {
      chaiHttpResponse = await chai.request(app).post('/matches').set('authorization', 'qualquer coisa').send(mockMatches)
      expect(chaiHttpResponse).to.have.status(201);
    })
  })
})
