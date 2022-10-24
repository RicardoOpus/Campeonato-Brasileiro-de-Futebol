import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as Sinon from 'sinon';
import { app } from '../app'
import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;

describe("TESTES DA ROTA '/login/validate'", () => {
  describe('Casos de acerto', async () => {

    const mockRole = {
      username: 'User',
      email: 'user@user.com',
      id: 2,
      role: 'user',
    };

    before(async() => {
      Sinon.stub(jwt, 'verify').resolves(mockRole);
    });
    after(async() => {
      (jwt.verify as Sinon.SinonStub).restore();
      });
    it('deve retotnar o role correto e o status 200', async () => {
      const result = await chai.request(app).get('/login/validate').set('authorization', 'qualquer coisa');

        expect(result).to.have.status(200);
        expect(result.body).to.have.property('role');
        expect(result.body.role).to.be.equal('user');
    })
  })
})

describe("Casos de erro da rota 'login/validate'", () => {
  it("Deve retornar mensagem 'Authorization needs a token'", async () => {
    const result = await chai.request(app).get('/login/validate')

    expect(result).to.have.status(400);
    expect(result.body).to.have.property('message');
    expect(result.body.message).to.be.equal('Authorization needs a token');
  })
})

