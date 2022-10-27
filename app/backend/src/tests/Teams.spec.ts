import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as Sinon from 'sinon';
import { app } from '../app'
import { Response } from 'superagent';
import Match from '../database/models/matches'
// import { mockMatches } from './mocks/matchesMock'

chai.use(chaiHttp);

const { expect } = chai;

describe('TESTES DA ROTA /teams', () => {
  let chaiHttpResponse: Response;

  // before(async() => {
  //   Sinon.stub(Match, 'findAll').resolves();
  // });
  // after(async() => {
  //     (Match.findAll as Sinon.SinonStub).restore();
  //   });

  describe('Verifica casos de acerto', () => {
    it('deve retornar todos os times', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams')
      expect(chaiHttpResponse).to.have.status(200);
    })
  })
})
