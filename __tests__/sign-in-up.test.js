const { server } = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

let obj = {
  username: 'moha',
  password: '1234',
};

describe('signin/up', () => {
  it('should signin if exitis', async () => {
    let results = await mockRequest.post('/signup').send(obj);
    results = await mockRequest.post(`/signin`).auth('moha', '1234');
    expect(results.status).toBe(200);
  });
  it('should return 500 if entered wrong password', async () => {
    let results = await mockRequest.post('/signup').send(obj);
    results = await mockRequest.post(`/signin`).auth('moha', '123');
    expect(results.status).toBe(500);
  });
  it('should signin if user not exitis', async () => {
    obj = {
      username: 'jojo',
      password: '1234',
    };
    let results = await mockRequest.post('/signup').send(obj);
    console.log('__results__', results.status);
    expect(results.status).toBe(200);
  });
  it('should return 500 if user already taken', async () => {
    obj = {
      username: 'jojo',
      password: '1234',
    };
    let results = await mockRequest.post('/signup').send(obj);
    results = await mockRequest.post('/signup').send(obj);
    console.log('__results__', results.status);
    expect(results.status).toBe(500);
  });
});
