/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */

process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://localhost/test_cashier';

const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const mongoose = require('mongoose');
const server = require('../main');

chai.use(chaiHttp);

describe('API Test', () => {
  afterEach('drop database test', async () => {
    await mongoose.connection.dropDatabase();
  });

  describe('GET /', () => {
    it('should return ok', async () => {
      try {
        const res = await chai.request(server).get('/');

        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('system cashier service up and running');
        expect(res.body).to.have.property('timestamp');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('POST /api/v1/auth/register/user', () => {
    it('should return error validation schema', async () => {
      try {
        const res = await chai.request(server).post('/api/v1/auth/user/create');

        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('Validation Error');
        expect(res.body).to.have.property('error');
      } catch (error) {
        throw error;
      }
    });
    it('should error validation, username already exist', async () => {
      try {
        await chai.request(server).post('/api/v1/auth/user/create').send({ username: 'wildan', password: '123123' });
        const res = await chai
          .request(server)
          .post('/api/v1/auth/user/create')
          .send({ username: 'wildan', password: '123123' });

        expect(res.status).to.equal(400);
      } catch (error) {
        throw error;
      }
    });
    it('should success register', async () => {
      try {
        const res = await chai
          .request(server)
          .post('/api/v1/auth/user/create')
          .send({ username: 'wildan', password: '123123' });

        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Data succesfully inputed');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('username');
        expect(res.body.data.username).to.equal('wildan');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('POST /api/auth/user/login', () => {
    it('should return error validation schema', async () => {
      try {
        const res = await chai.request(server).post('/api/v1/auth/user/login');

        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('Validation Error');
        expect(res.body).to.have.property('error');
      } catch (error) {
        throw error;
      }
    });
    it('should error validation, username not found', async () => {
      try {
        await chai.request(server).post('/api/v1/auth/user/create').send({ username: 'lele', password: '123123' });
        const res = await chai
          .request(server)
          .post('/api/v1/auth/user/login')
          .send({ username: 'wildan', password: '123123' });

        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.message).to.equal('username not found');
      } catch (error) {
        throw error;
      }
    });
    it('should successfully login', async () => {
      try {
        await chai.request(server).post('/api/v1/auth/user/create').send({ username: 'wildan', password: '123123' });
        const res = await chai
          .request(server)
          .post('/api/v1/auth/user/login')
          .send({ username: 'wildan', password: '123123' });

        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('succes login');
        expect(res.body).to.have.property('data');
      } catch (error) {
        throw error;
      }
    });
  });
  describe('POST /api/v1/auth/member/create', () => {
    it('should return error validation token', async () => {
      try {
        const res = await chai.request(server).post('/api/v1/auth/member/create');
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal(403);
        expect(res.body.message).to.equal('please provide token');
      } catch (error) {
        throw error;
      }
    });
    it('should return error validation schema', async () => {
      try {
        await chai.request(server).post('/api/v1/auth/user/create').send({ username: 'wildan', password: '123123' });
        const login = await chai
          .request(server)
          .post('/api/v1/auth/user/login')
          .send({ username: 'wildan', password: '123123' });
        const token = login.body.data;
        const res = await chai
          .request(server)
          .post('/api/v1/auth/member/create')
          .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('Validation Error');
        expect(res.body).to.have.property('error');
      } catch (error) {
        throw error;
      }
    });
    it('should success register member', async () => {
      try {
        await chai.request(server).post('/api/v1/auth/user/create').send({ username: 'wildan', password: '123123' });
        const login = await chai
          .request(server)
          .post('/api/v1/auth/user/login')
          .send({ username: 'wildan', password: '123123' });
        const token = login.body.data;
        const res = await chai
          .request(server)
          .post('/api/v1/auth/member/create')
          .set('Authorization', `Bearer ${token}`)
          .send({ name: 'suneo' });

        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Member Successfully inputed');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('name');
        expect(res.body.data.name).to.equal('suneo');
      } catch (error) {
        throw error;
      }
    });
  });
  describe('POST /api/v1/auth/member/update', () => {
    it('should return error validation token', async () => {
      try {
        const res = await chai.request(server).post('/api/v1/auth/member/update');
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal(403);
        expect(res.body.message).to.equal('please provide token');
      } catch (error) {
        throw error;
      }
    });
    it('should return error validation schema', async () => {
      try {
        await chai.request(server).post('/api/v1/auth/user/create').send({ username: 'wildan', password: '123123' });
        const login = await chai
          .request(server)
          .post('/api/v1/auth/user/login')
          .send({ username: 'wildan', password: '123123' });
        const token = login.body.data;
        const res = await chai
          .request(server)
          .post('/api/v1/auth/member/update')
          .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.message).to.equal('Validation Error');
        expect(res.body).to.have.property('error');
      } catch (error) {
        throw error;
      }
    });
  });
  it('should return error member not found', async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const admin = await chai
        .request(server)
        .post('/api/v1/auth/user/create')
        .send({ username: 'wildan', password: '123123' });
      const login = await chai
        .request(server)
        .post('/api/v1/auth/user/login')
        .send({ username: 'wildan', password: '123123' });
      const token = login.body.data;
      await chai
        .request(server)
        .post('/api/v1/auth/member/update')
        .set('Authorization', `Bearer ${token}`)
        .send({ memberId: 'M-1611711', expired: 1 });
      const res = await chai
        .request(server)
        .post('/api/v1/auth/member/update')
        .set('Authorization', `Bearer ${token}`)
        .send({ memberId: 'M-1655211', expired: 1 });

      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal(404);
      expect(res.body.message).to.equal('user not found');
    } catch (error) {
      throw error;
    }
  });
  it('should success update member', async () => {
    try {
      await chai.request(server).post('/api/v1/auth/user/create').send({ username: 'wildan', password: '123123' });
      const login = await chai
        .request(server)
        .post('/api/v1/auth/user/login')
        .send({ username: 'wildan', password: '123123' });
      const token = login.body.data;
      const member = await chai
        .request(server)
        .post('/api/v1/auth/member/create')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'suneo' });
      console.log(member.body);
      const res = await chai
        .request(server)
        .post('/api/v1/auth/member/update')
        .set('Authorization', `Bearer ${token}`)
        .send({
          memberId: member.body.data.memberId,
          expired: 1,
        });
      console.log(res.body);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal(200);
      expect(res.body.message).to.equal('update successfully');
      expect(res.body).to.have.property('data');
      expect(res.body.data.name).to.equal('suneo');
      expect(res.body.data.diskon).to.equal(5);
    } catch (error) {
      throw error;
    }
  });
});
