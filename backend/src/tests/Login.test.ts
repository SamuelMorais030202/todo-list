import * as sinon from 'sinon';
import * as chai from 'chai';

//@ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import Validations from '../middlewares/Validations';
import {
  invalidLoginEmail,
  invalidLoginPassword,
  user,
  validLogin,
} from './mocks/Login.mocks';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Login test', () => {
  afterEach(sinon.restore);

  it('Valid login', async () => {
    sinon.stub(Validations, 'validateLogin').returns();
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);

    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(validLogin);

    expect(status).to.equal(200);
    expect(body).to.have.property('token');
  });

  it('Login failed, email invalid', async () => {
    sinon.stub(Validations, 'validateLogin').returns();
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(invalidLoginEmail);

    expect(status).to.equal(401);
    expect(body.message).to.equal('Invalid email or password');
  });

  it('Login failed, password inválid', async () => {
    sinon.stub(Validations, 'validateLogin').returns();
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);

    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(invalidLoginPassword);

    expect(status).to.equal(401);
    expect(body).to.have.property('message');
    expect(body.message).to.equal('Invalid email or password');
  });

  it('Login failed, email not sent on request', async () => {
    const { email, password } = validLogin;
    
    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send({ password });

    expect(status).to.equal(400);
    expect(body).to.have.property('message');
    expect(body.message).to.equal('All fields must a be filled');
  });

  it('Login failed, password not send on request', async () => {
    const { email, password } = validLogin;

    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send({ email });

    expect(status).to.equal(400)
    expect(body.message).to.equal('All fields must a be filled');
  });
});