import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as Sinon from 'sinon';
import * as bcrypt from 'bcryptjs';
import { app } from '../app'
import User from '../database/models/users'
import { Response } from 'superagent';
import {userDefaultMock, 
  loginMock,
  loginInvalidEmail,
  loginInvalidPassword,
  loginInvalidMock,
  loginWrongPassword} from './mocks/userMock'

chai.use(chaiHttp);

const { expect } = chai;

describe('TESTES DA ROTA /login', () => {
  describe('POST', () => {
    let chaiHttpResponse: Response;   
    
    before(async() => {
      Sinon.stub(User, 'findOne').resolves(userDefaultMock as User)
    });
    after(async() => {
        (User.findOne as Sinon.SinonStub).restore();
      });
      
    it('Deve conseguir fazer login com sucesso, retornando um token', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(loginMock);
      
      expect(chaiHttpResponse.body).to.have.property('token');
    })
    it('Deve retornar um statusHttp 200', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(loginMock);
      
      expect(chaiHttpResponse.status).to.be.equal(200);
    })
  })
  describe('TESTA CASOS DE ERRO', () => {
    it("Deve retornar mensagem 'All fields must be filled' e o status 400 quando não envia usuário ou senha", async () => {
      const result = await chai.request(app).post('/login')
  
      expect(result.status).to.be.equal(400);
      expect(result.body).to.be.deep.equal({message: "All fields must be filled"})
    })
    it("Deve retornar o status 400 , e a mensagem 'Inset a valid email' quando passado email inválido", async () => {
      const result = await chai.request(app).post('/login').send(loginInvalidEmail);
      expect(result.status).to.be.equal(400);
      expect(result.body).to.be.deep.equal({message: "Inset a valid email"})
    })
    it("Deve retornar mensagem 'password is too short' e status 400, quando a senha enviada for menor que 8 caracteres", async () => {
      const result = await chai.request(app).post('/login').send(loginInvalidPassword);
      
      expect(result.status).to.be.equal(400);
      expect(result.body).to.be.deep.equal({message: "password is too short"})
    })
  })
  describe('Testa usuário inexistentes', () => {
    let chaiHttpResponse: Response;   
    
    before(async() => {
      Sinon.stub(User, 'findOne').resolves(undefined)
    });
    after(async() => {
        (User.findOne as Sinon.SinonStub).restore();
      });
      
    it("Deve retornar a mensagem 'Incorrect email or password' quando não existe email cadastrado", async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(loginInvalidMock);
      
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: "Incorrect email or password"})
    })
  })
  describe('Testa senha inexistentes', () => {
    let chaiHttpResponse: Response;   
    
    before(async() => {
      Sinon.stub(User, 'findOne').resolves(userDefaultMock as User)
      Sinon.stub(bcrypt, 'compare').resolves(false)
    });
    after(async() => {
        (User.findOne as Sinon.SinonStub).restore();
      });
    it("Deve retornar a mensagem 'Incorrect email or password' quando a senha está errada", async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(loginWrongPassword);
      
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: "Incorrect email or password"})
    })
  })
})

describe('TESTA ROTA PADRÃO /', () => {
  it("Deve retornar mensagem 'ok: true'", async () => {
    const result = await chai.request(app).get('/');

    expect(result.body).to.be.deep.equal({ ok: true })
  })
})