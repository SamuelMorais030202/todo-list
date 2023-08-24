import * as sinon from 'sinon';
import *  as chai from 'chai';

//@ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeTasks from '../database/models/SequelizeTasks';
import Validations from '../middlewares/Validations';
import { listTaskUserId, login, newTask } from './mocks/Task.mocks';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Tasks tests', () => {
  it('Should create task', async () => {
    sinon.stub(SequelizeTasks, 'create').resolves(newTask as any);
    sinon.stub(Validations, 'validateTasks').returns();

    const requestLogin = await chai
      .request(app)
      .post('/login')
      .send({
        email: login.email,
        password: login.password,
      });

    const { id, ...sendData } = newTask;

    const { status, body } = await chai
      .request(app)
      .post('/task')
      .auth(requestLogin.body.token, { type: 'bearer' })
      .send(sendData);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(newTask);
  });

  it('Must receive all tasks from given user', async () => {
    sinon.stub(SequelizeTasks, 'findAll').resolves(listTaskUserId as any);

    const requestLogin = await chai
      .request(app)
      .post('/login')
      .send({
        email: login.email,
        password: login.password,
      });

    const { status, body } = await chai
      .request(app)
      .get('/task')
      .auth(requestLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(200);
    expect(body).to.deep.equal(listTaskUserId);
  });

  afterEach(sinon.restore)
});