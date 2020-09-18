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
// const User = require('../model/User');

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
        // expect(res.body.status).to.equal(200);
        // expect(res.body.message).to.equal('system cashier service up and running');
        // expect(res.body).to.have.property('timestamp');
      } catch (error) {
        throw error;
      }
    });
  });
});
