import * as chai from 'chai';
import * as sinon from 'sinon';

//@ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import {
  userValid,
  newUser,
  updateUser,
  invalidCreateUser,
  invalidCreateUserPassword,
  invalidCreateUserFullName,
  invalidCreateUserPhone
} from './mocks/User.mocks';
import Validations from '../middlewares/Validations';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('User test', () => {

  describe('Tests create user', () => {
    it('Should create user', async () => {
      sinon.stub(SequelizeUser, 'create').resolves(newUser as any);
      sinon.stub(Validations, 'validateNewUser').returns();

      const { id, ...sendData } = newUser;

      const { status, body } = await chai
        .request(app)
        .post('/user')
        .send(sendData);

      expect(status).to.equal(201);
      expect(body).to.deep.equal(newUser);
    });

    it('Should return an error when trying to create a user with on invalid email', async () => {
      const { status, body } = await chai
        .request(app)
        .post('/user')
        .send(invalidCreateUser);

      expect(status).to.equal(401);
      expect(body.message).to.deep.equal('Email invalid');
    });

    it('Should return an error when tring to create a user without all information. "Email"', async () => {
      const { email, id, ...sendData } = userValid;

      const { status, body } = await chai
        .request(app)
        .post('/user')
        .send(sendData);

      expect(status).to.equal(400);
      expect(body.message).to.deep.equal('All fields must a be filled');
    });

    it('should return an error when trying to create user with on invalid password', async () => {
      const { status, body } = await chai
        .request(app)
        .post('/user')
        .send(invalidCreateUserPassword);

      expect(status).to.equal(401);
      expect(body.message).to.equal('Password must be at least 4 letters long');
    });

    it('Should return an error when tring to create a user without all information. "Password"', async () => {
      const { id, password, ...sendData } = userValid;

      const { status, body } = await chai
        .request(app)
        .post('/user')
        .send(sendData);

      expect(status).to.equal(400);
      expect(body.message).to.equal('All fields must a be filled');
    });

    it('Should return an error when tring to create a user with on invalid fullName', async () => {
      const { status, body } = await chai
        .request(app)
        .post('/user')
        .send(invalidCreateUserFullName);

      expect(status).to.equal(401);
      expect(body.message).to.equal('Full name must be at least 5 letters long');
    });

    it('Sould return an error when tring to create a user without all informations. "FullName"', async () => {
      const { id, fullName, ...sendData } = userValid;

      const { status, body } = await chai
        .request(app)
        .post('/user')
        .send(sendData)
        
      expect(status).to.equal(400);
      expect(body.message).to.equal('All fields must a be filled');
    });

    it('Sould return an error when tring create user whin on invalid phone', async () => {
      const { status, body } = await chai
        .request(app)
        .post('/user')
        .send(invalidCreateUserPhone);

      expect(status).to.equal(401);
      expect(body.message).to.equal('Invalid cell phone format');
    });

    it('Sould return an error when tring to create a user without all informations. "Phone"', async () => {
      const { id, phone, ...sendData } = userValid;

      const { status, body } = await chai
        .request(app)
        .post('/user')
        .send(sendData)
        
      expect(status).to.equal(400);
      expect(body.message).to.equal('All fields must a be filled');
    });
  });

  describe('Tests getUserById', () => {
    it('Should get user by id', async () => {
      sinon.stub(SequelizeUser, 'findByPk').resolves(userValid as any);

      const requestLogin = await chai
        .request(app)
        .post('/login')
        .send({
          email: userValid.email,
          password: userValid.password,
        });

      const { status, body } = await chai
        .request(app)
        .get('/user')
        .auth(requestLogin.body.token, { type: 'bearer' });

      expect(status).to.equal(200);
      expect(body).to.deep.equal(userValid);
    });

    it('Should return an error when trying to get the user by id', async () => {
      sinon.stub(SequelizeUser, 'findByPk').resolves(null);

      const requestLogin = await chai
        .request(app)
        .post('/login')
        .send({
          email: userValid.email,
          password: userValid.password,
        });

      const { status, body } = await chai
        .request(app)
        .get('/user')
        .auth(requestLogin.body.token, { type: 'bearer' });

      expect(status).to.equal(404);
      expect(body.message).to.deep.equal('User not found');
    });
  });

  describe('Tests update user', async () => {
    it('Should update user', async () => {
      sinon.stub(SequelizeUser, 'update').resolves([1] as any);
      sinon.stub(SequelizeUser, 'findByPk').resolves(updateUser as any)
      sinon.stub(Validations, 'validateNewUser').returns();

      const requestLogin = await chai
        .request(app)
        .post('/login')
        .send({
          email: userValid.email,
          password: userValid.password,
        });

      const { id, ...sendData } = updateUser

      const { status, body } = await chai
        .request(app)
        .put('/user')
        .auth(requestLogin.body.token, { type: 'bearer' })
        .send(sendData);

      expect(status).to.equal(200);
      expect(body).to.deep.equal(updateUser);
    });
  });

  afterEach(sinon.restore);
});