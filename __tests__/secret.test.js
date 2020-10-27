const { server } = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

let mockUser = {
  username: 'moha',
  password: '1234',
};
let bodyMock = {
  username: 'moha',
  iat: '1234',
};
describe('secrets', () => {
  it('should have accsess into secret route only if the user sign in', async () => {
    let results = await mockRequest.post('/signup').send(mockUser);
    results = await mockRequest.post(`/signin`).auth('moha', '1234');
    const { body } = await mockRequest
      .get('/secret')
      .set('Authorization', 'bearer ' + results.body.token);
    console.log('__body__', body);
    expect(body).toHaveProperty('username');
  });
});
