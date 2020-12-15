const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts/', () => {
  before(async () => {
    const testConOne = new Concert({
      performer: 'John',
      genre: 'Pop',
      price: 30,
      day: 2,
      image: 'image',
    });
    await testConOne.save();

    const testConTwo = new Concert({
      performer: 'John',
      genre: 'Rock',
      price: 15,
      day: 1,
      image: 'image',
    });
    await testConTwo.save();

    const testConThree = new Concert({
      performer: 'Madonna',
      genre: 'Pop',
      price: 10,
      day: 1,
      image: 'image',
    });
    await testConThree.save();
  });

  it('/ should return concerts filtered by performers', async () => {
    const res = await request(server).get('/api/concerts/performer/John');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
    const res2 = await request(server).get('/api/concerts/performer/Madonna');
    expect(res2.status).to.be.equal(200);
    expect(res2.body).to.be.an('array');
    expect(res2.body.length).to.be.equal(1);
  });

  it('/ should return concerts filtered by genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Pop');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
    const res2 = await request(server).get('/api/concerts/genre/Rock');
    expect(res2.status).to.be.equal(200);
    expect(res2.body).to.be.an('array');
    expect(res2.body.length).to.be.equal(1);
  });

  it('/ should return concerts filtered by price', async () => {
    const res = await request(server).get('/api/concerts/price/5/20');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
    const res2 = await request(server).get('/api/concerts/price/25/30');
    expect(res2.status).to.be.equal(200);
    expect(res2.body).to.be.an('array');
    expect(res2.body.length).to.be.equal(1);
  });

  it('/ should return concerts filtered by day', async () => {
    const res = await request(server).get('/api/concerts/price/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
    const res2 = await request(server).get('/api/concerts/price/day/3');
    expect(res2.status).to.be.equal(200);
    expect(res2.body).to.be.an('array');
    expect(res2.body.length).to.be.equal(0);
  });

  after(async () => {
    await Concert.deleteMany();
  });
});
