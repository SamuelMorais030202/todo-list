import * as sinon from 'sinon';
import *  as chai from 'chai';

//@ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeTasks from '../database/models/SequelizeTasks';
import Validations from '../middlewares/Validations';
import { listTaskUserId, login, newTask, tasksCompleted } from './mocks/Task.mocks';

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

  it('Should return an error when trying to create a task without the completed field', async () => {
    const requestLogin = await chai
      .request(app)
      .post('/login')
      .send({
        email: login.email,
        password: login.password,
      });
    
    const { completed, id, ...sendData } = newTask;

    const { status, body } = await chai
      .request(app)
      .post('/task')
      .send(sendData)
      .auth(requestLogin.body.token, { type: 'bearer' });
    
    expect(status).to.equal(400);
    expect(body.message).to.equal('All fields must a be filled');
  });

  it('Should return an error when trying to create a task without the data field', async () => {
    const requestLogin = await chai
      .request(app)
      .post('/login')
      .send({
        email: login.email,
        password: login.password,
      });
    
    const { data, id, ...sendData } = newTask;

    const { status, body } = await chai
      .request(app)
      .post('/task')
      .send(sendData)
      .auth(requestLogin.body.token, { type: 'bearer' });
    
    expect(status).to.equal(400);
    expect(body.message).to.equal('All fields must a be filled');
  });

  it('Should return an error when trying to create a task without the description field', async () => {
    const requestLogin = await chai
      .request(app)
      .post('/login')
      .send({
        email: login.email,
        password: login.password,
      });
    
    const { description, id, ...sendData } = newTask;

    const { status, body } = await chai
      .request(app)
      .post('/task')
      .send(sendData)
      .auth(requestLogin.body.token, { type: 'bearer' });
    
    expect(status).to.equal(400);
    expect(body.message).to.equal('All fields must a be filled');
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

  it('Should return the updated task', async () => {
    sinon.stub(Validations, 'validateTasks').returns();
    sinon.stub(SequelizeTasks, 'update').resolves([1] as any);
    sinon.stub(SequelizeTasks, 'findByPk').resolves(newTask as any);

    const requestLogin = await chai
      .request(app)
      .post('/login')
      .send({
        email: login.email,
        password: login.password,
      });

    const { userId, ...sendData } = newTask;

    const { status, body } = await chai
      .request(app)
      .put('/task')
      .auth(requestLogin.body.token, { type: 'bearer' })
      .send(sendData);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(newTask);
  });

  it('Must delete a task', async () => {
    sinon.stub(SequelizeTasks, 'findByPk').resolves(listTaskUserId[0] as any);
    sinon.stub(SequelizeTasks, 'destroy').resolves();

    const requestLogin = await chai
      .request(app)
      .post('/login')
      .send({
        email: login.email,
        password: login.password,
      });
    
    const { status, body } = await chai
      .request(app)
      .delete('/task/1')
      .auth(requestLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(200);
    expect(body.message).to.deep.equal('Task deleted successfully')
  });

  it('Should return uncompleted tasks', async () => {
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
      .get('/task/false')
      .auth(requestLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(200);
    expect(body).to.deep.equal(listTaskUserId);
  });

  it('Should return completed tasks', async () => {
    sinon.stub(SequelizeTasks, 'findAll').resolves(tasksCompleted as any);

    const requestLogin = await chai
      .request(app)
      .post('/login')
      .send({
        email: login.email,
        password: login.password,
      });

    const { status, body } = await chai
      .request(app)
      .get('/task/true')
      .auth(requestLogin.body.token, { type: 'bearer' });

    expect(status).to.equal(200);
    expect(body).to.deep.equal(tasksCompleted);
  });

  afterEach(sinon.restore)
});